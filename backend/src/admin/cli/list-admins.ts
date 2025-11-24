#!/usr/bin/env node

/**
 * CLI Script: List All Admin Users
 * 
 * Usage:
 *   ts-node -r tsconfig-paths/register src/admin/cli/list-admins.ts
 *   
 * Or add to package.json scripts:
 *   "admin:list": "ts-node -r tsconfig-paths/register src/admin/cli/list-admins.ts"
 */

import * as mongoose from 'mongoose';
import { config } from 'dotenv';
import { UserSchema } from '../../auth/schemas/user.schema';
import { ROLES } from '../../auth/schemas/const';

// Load environment variables
config();

interface User {
  _id: any;
  authenticatorId: string;
  email: string;
  roles: string[];
  authenticatorProviderKey?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

async function listAdmins(): Promise<void> {
  const mongoUrl = process.env.MONGO_URL;
  
  if (!mongoUrl) {
    throw new Error('MONGO_URL environment variable is required');
  }

  console.log('🔌 Connecting to MongoDB...');
  const connection = await mongoose.connect(mongoUrl, {
    serverSelectionTimeoutMS: 5000,
  });

  console.log('✅ Connected to MongoDB');

  try {
    const UserModel = connection.connection.model<User>('User', UserSchema);

    console.log(`🔍 Looking for users with ${ROLES.ADMIN} role...`);
    const admins = await UserModel.find({ roles: ROLES.ADMIN });

    if (admins.length === 0) {
      console.log('📭 No admin users found');
      return;
    }

    console.log(`\n👥 Found ${admins.length} admin user(s):\n`);
    
    admins.forEach((admin, index) => {
      console.log(`${index + 1}. ${admin.email}`);
      console.log(`   ID: ${admin._id}`);
      console.log(`   Roles: ${admin.roles.join(', ')}`);
      if (admin.createdAt) {
        console.log(`   Created: ${admin.createdAt.toISOString()}`);
      }
      console.log('');
    });

  } finally {
    await connection.connection.close();
    console.log('🔌 Disconnected from MongoDB');
  }
}

async function main() {
  try {
    await listAdmins();
  } catch (error) {
    console.error('💥 Error:', error.message);
    process.exit(1);
  }
}

// Run if this file is executed directly
if (require.main === module) {
  main().catch(console.error);
}

export { listAdmins };

