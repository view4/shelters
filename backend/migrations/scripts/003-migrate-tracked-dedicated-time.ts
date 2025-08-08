/**
 * Migration: Populate TrackedDedicatedTime junction table
 * 
 * This migration creates TrackedDedicatedTime entries from existing 
 * TrackedTime records that have dedicatedTime relationships.
 */

import * as mongoose from 'mongoose';

/**
 * Get TrackedTime schema for migration
 */
function getTrackedTimeSchema(): mongoose.Schema {
  return new mongoose.Schema({
    name: String,
    text: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    mins: Number,
    dedicatedTime: { type: mongoose.Schema.Types.ObjectId, ref: 'DedicatedTime' }
  }, { timestamps: true });
}

/**
 * Get TrackedDedicatedTime schema for migration
 */
function getTrackedDedicatedTimeSchema(): mongoose.Schema {
  const schema = new mongoose.Schema({
    trackedTime: { type: mongoose.Schema.Types.ObjectId, ref: 'TrackedTime', required: true },
    dedicatedTime: { type: mongoose.Schema.Types.ObjectId, ref: 'DedicatedTime', required: true }
  }, { timestamps: true });

  // Add compound index for efficient queries
  schema.index({ trackedTime: 1, dedicatedTime: 1 }, { unique: true });
  
  return schema;
}

export default async function migrate(db: mongoose.Connection) {
  console.log('🔧 Migrating tracked-dedicated-time relationships');
  
  // List all db collection names for debugging
  const collections = await db.db.listCollections().toArray();
  console.log("collections", collections.map(c => c.name));
  
  try {
    // Register models with schemas
    let TrackedDedicatedTimeModel;
    let TrackedTimeModel;

    try {
      // Try to get existing model
      TrackedDedicatedTimeModel = db.model('TrackedDedicatedTime');
      console.log('📄 Using existing TrackedDedicatedTime model');
    } catch (error) {
      // Model doesn't exist, create it
      console.log('📄 Creating new TrackedDedicatedTime model...');
      TrackedDedicatedTimeModel = db.model('TrackedDedicatedTime', getTrackedDedicatedTimeSchema());
    }

    try {
      // Try to get existing model  
      TrackedTimeModel = db.model('TrackedTime');
      console.log('📄 Using existing TrackedTime model');
    } catch (error) {
      // Model doesn't exist, create it
      console.log('📄 Creating new TrackedTime model...');
      TrackedTimeModel = db.model('TrackedTime', getTrackedTimeSchema());
    }

    console.log('✅ Models registered successfully');

    // Check if TrackedDedicatedTime collection exists, create it if not
    const collections = await db.db.listCollections({ name: 'trackeddedicatedtimes' }).toArray();
    if (collections.length === 0) {
      console.log('📁 Creating TrackedDedicatedTime collection...');
      await db.db.createCollection('trackeddedicatedtimes');
    }

    // Find all TrackedTime records that have dedicatedTime relationships
    console.log('🔍 Finding TrackedTime records with dedicatedTime relationships...');
    const trackedTimesWithDedicatedTime = await TrackedTimeModel.find({
      dedicatedTime: { $exists: true, $ne: null }
    }).select('_id dedicatedTime');

    console.log(`📊 Found ${trackedTimesWithDedicatedTime.length} TrackedTime records with dedicatedTime relationships`);

    if (trackedTimesWithDedicatedTime.length === 0) {
      console.log('✅ No TrackedTime records with dedicatedTime relationships found, migration complete');
      return;
    }

    // Create TrackedDedicatedTime entries
    let successCount = 0;
    let skipCount = 0;

    for (const trackedTime of trackedTimesWithDedicatedTime) {
      try {
        // Check if relationship already exists
        const existingRelation = await TrackedDedicatedTimeModel.findOne({
          trackedTime: trackedTime._id,
          dedicatedTime: trackedTime.dedicatedTime
        });

        if (existingRelation) {
          console.log(`⚠️  Relationship already exists for TrackedTime ${trackedTime._id} and DedicatedTime ${trackedTime.dedicatedTime}`);
          skipCount++;
          continue;
        }

        // Create new TrackedDedicatedTime entry
        const trackedDedicatedTime = new TrackedDedicatedTimeModel({
          trackedTime: trackedTime._id,
          dedicatedTime: trackedTime.dedicatedTime
        });

        await trackedDedicatedTime.save();
        successCount++;

        console.log(`✅ Created TrackedDedicatedTime: TrackedTime ${trackedTime._id} ↔ DedicatedTime ${trackedTime.dedicatedTime}`);

      } catch (error) {
        console.error(`❌ Failed to create TrackedDedicatedTime for TrackedTime ${trackedTime._id}:`, error.message);
        // Continue with other records rather than failing the entire migration
      }
    }

    console.log(`📈 Migration Summary:`);
    console.log(`   ✅ Successfully created: ${successCount} relationships`);
    console.log(`   ⚠️  Skipped (already exists): ${skipCount} relationships`);
    console.log(`   📊 Total processed: ${trackedTimesWithDedicatedTime.length} records`);

    console.log('✅ Tracked-DedicatedTime migration completed successfully');
    
  } catch (error) {
    console.error('❌ Tracked-DedicatedTime migration failed:', error.message);
    throw error;
  }
}