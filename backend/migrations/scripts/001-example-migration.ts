/**
 * Example Migration Script
 * 
 * This is an example of how to structure a migration script.
 * Migration scripts should export a function that performs the migration.
 * The function can be named 'default', 'up', or 'migrate'.
 */

import * as mongoose from 'mongoose';

// Example: Adding an index to a collection
export default async function migrate(db: mongoose.Connection) {
  console.log('🔧 Running example migration: Adding index to users collection');
  
  try {
    // Example database operation
    
    // Check if collection exists
    const collections = await db.db.listCollections({ name: 'users' }).toArray();
    
    if (collections.length > 0) {
      // Add an index (example operation)
      await db.db.collection('users').createIndex({ email: 1 }, { unique: true, sparse: true });
      console.log('✅ Index created on users.email');
    } else {
      console.log('⚠️  Users collection does not exist, skipping index creation');
    }
    
    // You can perform any database operations here:
    // - Creating indexes
    // - Updating documents
    // - Migrating data structure
    // - Adding new fields with default values
    // - etc.
    
    console.log('✅ Example migration completed successfully');
    
  } catch (error) {
    console.error('❌ Example migration failed:', error.message);
    throw error; // Re-throw to mark migration as failed
  }
}

// Alternative export patterns that are also supported:
// export const up = async () => { /* migration logic */ };
// export const migrate = async () => { /* migration logic */ };