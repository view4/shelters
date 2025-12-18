#!/usr/bin/env node

/**
 * CLI Script: Add Admin Role to User
 * 
 * Usage:
 *   ts-node -r tsconfig-paths/register src/admin/cli/add-admin-role.ts <email>
 *   
 * Or add to package.json scripts:
 *   "admin:add": "ts-node -r tsconfig-paths/register src/admin/cli/add-admin-role.ts"
 *   
 * Then run:
 *   npm run admin:add user@example.com
 */

import * as mongoose from 'mongoose';
import { Model } from 'mongoose';
import { config } from 'dotenv';
import { User, UserDocument, UserSchema } from '../../auth/schemas/user.schema';
import { ROLES } from '../../auth/schemas/const';

// Load environment variables
config();

async function addAdminRole(email: string): Promise<void> {
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
    let UserModel: Model<UserDocument>;
    if (connection.connection.models.User) {
      UserModel = connection.connection.models.User as Model<UserDocument>;
    } else {
      UserModel = connection.connection.model<UserDocument>('User', UserSchema) as Model<UserDocument>;
    }

    console.log(`🔍 Looking for user with email: ${email}`);
    const user = (await UserModel.findOne({ email })) as UserDocument | null;

    if (!user) {
      console.error(`❌ User not found with email: ${email}`);
      process.exit(1);
    }

    console.log(`👤 Found user: ${user.email}`);
    console.log(`   ID: ${user._id}`);
    console.log(`   Current roles: ${user.roles?.length ? user.roles.join(', ') : 'none'}`);

    // Check if user already has admin role
    if (user.roles && user.roles.includes(ROLES.ADMIN)) {
      console.log(`✅ User already has ${ROLES.ADMIN} role!`);
      return;
    }

    // Add admin role
    const updatedRoles = user.roles ? [...user.roles, ROLES.ADMIN] : [ROLES.ADMIN];
    user.roles = updatedRoles;

    await user.save();

    console.log(`✅ Successfully added ${ROLES.ADMIN} role to user: ${email}`);
    console.log(`   Updated roles: ${user.roles.join(', ')}`);

  } finally {
    await connection.connection.close();
    console.log('🔌 Disconnected from MongoDB');
  }
}

async function main() {
  const [, , email] = process.argv;

  if (!email) {
    console.log('📚 Add Admin Role CLI');
    console.log('=====================');
    console.log('Usage:');
    console.log('  ts-node -r tsconfig-paths/register src/admin/cli/add-admin-role.ts <email>');
    console.log('');
    console.log('Or use npm script:');
    console.log('  npm run admin:add <email>');
    console.log('');
    console.log('Environment Variables Required:');
    console.log('  MONGO_URL - MongoDB connection string');
    process.exit(1);
  }

  try {
    await addAdminRole(email);
  } catch (error) {
    console.error('💥 Error:', error.message);
    process.exit(1);
  }
}

// Run if this file is executed directly
if (require.main === module) {
  main().catch(console.error);
}

export { addAdminRole };

