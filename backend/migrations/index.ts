#!/usr/bin/env node

import * as mongoose from 'mongoose';
import * as fs from 'fs';
import * as path from 'path';
import { config } from 'dotenv';
import { DBMigration, DbMigrationSchema } from './db-migrations.model';

// Load environment variables
config();

interface MigrationScript {
  name: string;
  path: string;
  migrate: (db: mongoose.Connection) => Promise<void>;
}

class MigrationRunner {
  private dbConnection: mongoose.Connection;
  private migrationModel: mongoose.Model<DBMigration>;
  private scriptsPath: string;

  constructor() {
    this.scriptsPath = path.join(__dirname, 'scripts');
  }

  async connect(): Promise<void> {
    const mongoUrl = process.env.MONGO_URL;
    if (!mongoUrl) {
      throw new Error('MONGO_URL environment variable is required');
    }

    console.log('🔌 Connecting to MongoDB...');
    const connection = await mongoose.connect(mongoUrl, {
      serverSelectionTimeoutMS: 5000,
    });

    this.dbConnection = connection.connection;
    this.migrationModel = this.dbConnection.model('DBMigration', DbMigrationSchema);
    
    console.log('✅ Connected to MongoDB');
    console.log('✅ Database connection established:', !!this.dbConnection);
  }

  async disconnect(): Promise<void> {
    if (this.dbConnection) {
      await this.dbConnection.close();
      console.log('🔌 Disconnected from MongoDB');
    }
  }

  async loadMigrationScripts(): Promise<MigrationScript[]> {
    if (!fs.existsSync(this.scriptsPath)) {
      console.log('📁 Scripts directory not found, creating it...');
      fs.mkdirSync(this.scriptsPath, { recursive: true });
      return [];
    }

    const files = fs.readdirSync(this.scriptsPath);
    const migrationFiles = files.filter(file => 
      (file.endsWith('.ts') || file.endsWith('.js')) && 
      !file.endsWith('.d.ts')
    );

    const migrations: MigrationScript[] = [];

    for (const file of migrationFiles) {
      const filePath = path.join(this.scriptsPath, file);
      const name = path.basename(file, path.extname(file));
      
      try {
        // Import the migration script
        const migrationModule = require(filePath);
        const migrate = migrationModule.default || migrationModule.up || migrationModule.migrate;
        
        if (typeof migrate !== 'function') {
          console.warn(`⚠️  Migration ${file} does not export a valid function (default, up, or migrate)`);
          continue;
        }

        migrations.push({
          name,
          path: filePath,
          migrate
        });
      } catch (error) {
        console.warn(`⚠️  Could not load migration ${file}:`, error.message);
      }
    }

    return migrations.sort((a, b) => a.name.localeCompare(b.name));
  }

  async listMigrations(): Promise<void> {
    console.log('📋 Loading available migrations...');
    const migrations = await this.loadMigrationScripts();
    
    if (migrations.length === 0) {
      console.log('📭 No migration scripts found in the scripts/ directory');
      console.log('💡 Create migration files in:', this.scriptsPath);
      return;
    }

    console.log(`\n📄 Found ${migrations.length} migration(s):`);
    
    // Get migration statuses from database
    const dbMigrations = await this.migrationModel.find({});
    const migrationStatuses = new Map(
      dbMigrations.map(m => [m.migrationName, m])
    );

    for (const migration of migrations) {
      const status = migrationStatuses.get(migration.name);
      let statusIcon = '⚪';
      let statusText = 'not run';

      if (status) {
        switch (status.status) {
          case 'success':
            statusIcon = '✅';
            statusText = `completed (${status.finishedAt?.toISOString()})`;
            break;
          case 'failed':
            statusIcon = '❌';
            statusText = `failed (${status.message || 'no message'})`;
            break;
          case 'pending':
            statusIcon = '🔄';
            statusText = `running since ${status.startedAt.toISOString()}`;
            break;
        }
      }

      console.log(`  ${statusIcon} ${migration.name} - ${statusText}`);
    }
  }

  async runMigration(scriptName: string): Promise<void> {
    console.log(`🚀 Running migration: ${scriptName}`);
    // check connection to db and if not then throw error? 
    if (!this.dbConnection) {
      throw new Error('Database connection not established');
    }
    
    const migrations = await this.loadMigrationScripts();
    const migration = migrations.find(m => m.name === scriptName);
    
    if (!migration) {
      throw new Error(`Migration script '${scriptName}' not found`);
    }

    // Check if migration already completed successfully
    const existingMigration = await this.migrationModel.findOne({ 
      migrationName: scriptName,
      status: 'success'
    });

    if (existingMigration) {
      console.log(`✅ Migration '${scriptName}' already completed successfully at ${existingMigration.finishedAt}`);
      return;
    }

    // Create or update migration record
    let migrationRecord = await this.migrationModel.findOne({ migrationName: scriptName });
    
    if (!migrationRecord) {
      migrationRecord = new this.migrationModel({
        migrationName: scriptName,
        startedAt: new Date(),
        status: 'pending'
      });
    } else {
      migrationRecord.startedAt = new Date();
      migrationRecord.status = 'pending';
      migrationRecord.finishedAt = undefined;
      migrationRecord.message = undefined;
    }

    await migrationRecord.save();

    try {
      console.log(`⏳ Executing migration: ${scriptName}`);
      
      // Execute the migration with database connection
      await migration.migrate(this.dbConnection);
      
      // Update migration record on success
      migrationRecord.status = 'success';
      migrationRecord.finishedAt = new Date();
      migrationRecord.message = 'Migration completed successfully';
      await migrationRecord.save();

      console.log(`✅ Migration '${scriptName}' completed successfully!`);
      
    } catch (error) {
      // Update migration record on failure
      migrationRecord.status = 'failed';
      migrationRecord.finishedAt = new Date();
      migrationRecord.message = error.message || 'Unknown error occurred';
      await migrationRecord.save();

      console.error(`❌ Migration '${scriptName}' failed:`, error.message);
      throw error;
    }
  }

  async showStatus(): Promise<void> {
    console.log('📊 Migration Status Summary');
    console.log('============================');
    
    const allMigrations = await this.migrationModel.find({}).sort({ startedAt: -1 });
    
    if (allMigrations.length === 0) {
      console.log('📭 No migrations have been run yet');
      return;
    }

    const statusCounts = {
      success: 0,
      failed: 0,
      pending: 0
    };

    console.log('\n📋 Recent Migration History:');
    allMigrations.slice(0, 10).forEach(migration => {
      statusCounts[migration.status]++;
      
      let statusIcon = '⚪';
      switch (migration.status) {
        case 'success': statusIcon = '✅'; break;
        case 'failed': statusIcon = '❌'; break;
        case 'pending': statusIcon = '🔄'; break;
      }

      const timeInfo = migration.finishedAt 
        ? `finished: ${migration.finishedAt.toISOString()}`
        : `started: ${migration.startedAt.toISOString()}`;

      console.log(`  ${statusIcon} ${migration.migrationName} (${migration.status}) - ${timeInfo}`);
      if (migration.status === 'failed' && migration.message) {
        console.log(`      💬 ${migration.message}`);
      }
    });

    console.log(`\n📈 Summary: ${statusCounts.success} success, ${statusCounts.failed} failed, ${statusCounts.pending} pending`);
  }
}

async function main() {
  const [,, command, scriptName] = process.argv;
  
  if (!command) {
    console.log('📚 DB Migration CLI');
    console.log('===================');
    console.log('Usage:');
    console.log('  npm run migrate list              - List all available migrations');
    console.log('  npm run migrate run <script-name> - Run a specific migration');
    console.log('  npm run migrate status            - Show migration status summary');
    console.log('');
    console.log('Environment Variables Required:');
    console.log('  MONGO_URL - MongoDB connection string');
    return;
  }

  const runner = new MigrationRunner();

  try {
    await runner.connect();

    switch (command) {
      case 'list':
        await runner.listMigrations();
        break;
        
      case 'run':
        if (!scriptName) {
          console.error('❌ Script name is required for run command');
          console.log('Usage: npm run migrate run <script-name>');
          process.exit(1);
        }
        await runner.runMigration(scriptName);
        break;

      case 'status':
        await runner.showStatus();
        break;
        
      default:
        console.error(`❌ Unknown command: ${command}`);
        console.log('Available commands: list, run, status');
        process.exit(1);
    }
    
  } catch (error) {
    console.error('💥 Error:', error.message);
    process.exit(1);
  } finally {
    await runner.disconnect();
  }
}

// Run if this file is executed directly
if (require.main === module) {
  main().catch(console.error);
}

export { MigrationRunner };
