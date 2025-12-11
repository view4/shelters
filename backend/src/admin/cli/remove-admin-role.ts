#!/usr/bin/env node

/**
 * CLI Script: Remove Admin Role from User
 * 
 * Usage:
 *   ts-node -r tsconfig-paths/register src/admin/cli/remove-admin-role.ts <email>
 *   
 * Or add to package.json scripts:
 *   "admin:remove": "ts-node -r tsconfig-paths/register src/admin/cli/remove-admin-role.ts"
 */

import * as mongoose from 'mongoose';
import { Model } from 'mongoose';
import { config } from 'dotenv';
import { User, UserSchema } from '../../auth/schemas/user.schema';
import { ROLES } from '../../auth/schemas/const';

// Load environment variables
config();

async function removeAdminRole(email: string): Promise<void> {
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
    const UserModel: Model<User> =
      (connection.connection.models.User as Model<User>) ||
      connection.connection.model<User>('User', UserSchema);

    console.log(`🔍 Looking for user with email: ${email}`);
    const user = await UserModel.findOne({ email }).exec();

    if (!user) {
      console.error(`❌ User not found with email: ${email}`);
      process.exit(1);
    }

    console.log(`👤 Found user: ${user.email}`);
    console.log(`   ID: ${user._id}`);
    console.log(`   Current roles: ${user.roles?.length ? user.roles.join(', ') : 'none'}`);

    // Check if user has admin role
    if (!user.roles || !user.roles.includes(ROLES.ADMIN)) {
      console.log(`✅ User does not have ${ROLES.ADMIN} role!`);
      return;
    }

    // Remove admin role
    user.roles = user.roles.filter(role => role !== ROLES.ADMIN);

    await user.save();

    console.log(`✅ Successfully removed ${ROLES.ADMIN} role from user: ${email}`);
    console.log(`   Updated roles: ${user.roles.length ? user.roles.join(', ') : 'none'}`);

  } finally {
    await connection.connection.close();
    console.log('🔌 Disconnected from MongoDB');
  }
}

async function main() {
  const [,, email] = process.argv;

  if (!email) {
    console.log('📚 Remove Admin Role CLI');
    console.log('========================');
    console.log('Usage:');
    console.log('  ts-node -r tsconfig-paths/register src/admin/cli/remove-admin-role.ts <email>');
    console.log('');
    console.log('Or use npm script:');
    console.log('  npm run admin:remove <email>');
    console.log('');
    console.log('Environment Variables Required:');
    console.log('  MONGO_URL - MongoDB connection string');
    process.exit(1);
  }

  try {
    await removeAdminRole(email);
  } catch (error) {
    console.error('💥 Error:', error.message);
    process.exit(1);
  }
}

// Run if this file is executed directly
if (require.main === module) {
  main().catch(console.error);
}

export { removeAdminRole };

