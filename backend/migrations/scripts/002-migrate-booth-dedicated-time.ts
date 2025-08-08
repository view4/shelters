/**
 * Migration: Populate BoothDedicatedTime junction table
 * 
 * This migration creates BoothDedicatedTime entries from existing 
 * DedicatedTime records that have booth relationships.
 */

import * as mongoose from 'mongoose';

/**
 * Get DedicatedTime schema for migration
 */
function getDedicatedTimeSchema(): mongoose.Schema {
  return new mongoose.Schema({
    name: String,
    text: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    mins: Number,
    parent: { type: mongoose.Schema.Types.ObjectId, ref: 'DedicatedTime' },
    booth: { type: mongoose.Schema.Types.ObjectId, ref: 'Booth' }
  }, { timestamps: true });
}

/**
 * Get BoothDedicatedTime schema for migration
 */
function getBoothDedicatedTimeSchema(): mongoose.Schema {
  const schema = new mongoose.Schema({
    booth: { type: mongoose.Schema.Types.ObjectId, ref: 'Booth', required: true },
    dedicatedTime: { type: mongoose.Schema.Types.ObjectId, ref: 'DedicatedTime', required: true }
  }, { timestamps: true });

  // Add compound index for efficient queries
  schema.index({ booth: 1, dedicatedTime: 1 }, { unique: true });

  return schema;
}

export default async function migrate(db: mongoose.Connection) {
  console.log('🔧 Migrating booth-dedicated-time relationships');

  // List all db collection names for debugging
  const collections = await db.db.listCollections().toArray();
  console.log("collections", collections.map(c => c.name));

  try {

    // Register models with schemas (this is the key part!)
    let BoothDedicatedTimeModel;
    let DedicatedTimeModel;

    try {
      // Try to get existing model
      BoothDedicatedTimeModel = db.model('BoothDedicatedTime');
      console.log('📄 Using existing BoothDedicatedTime model');
    } catch (error) {
      // Model doesn't exist, create it
      console.log('📄 Creating new BoothDedicatedTime model...');
      BoothDedicatedTimeModel = db.model('BoothDedicatedTime', getBoothDedicatedTimeSchema());
    }

    try {
      // Try to get existing model  
      DedicatedTimeModel = db.model('DedicatedTime');
      console.log('📄 Using existing DedicatedTime model');
    } catch (error) {
      // Model doesn't exist, create it
      console.log('📄 Creating new DedicatedTime model...');
      DedicatedTimeModel = db.model('DedicatedTime', getDedicatedTimeSchema());
    }

    console.log('✅ Models registered successfully');

    // Check if BoothDedicatedTime collection exists, create it if not
    const collections = await db.db.listCollections({ name: 'boothdedicatedtimes' }).toArray();
    if (collections.length === 0) {
      console.log('📁 Creating BoothDedicatedTime collection...');
      await db.db.createCollection('boothdedicatedtimes');
    }

    // Find all DedicatedTime records that have booth relationships
    console.log('🔍 Finding DedicatedTime records with booth relationships...');
    const dedicatedTimesWithBooths = await DedicatedTimeModel.find({
      booth: { $exists: true, $ne: null }
    }).select('_id booth');

    console.log(`📊 Found ${dedicatedTimesWithBooths.length} DedicatedTime records with booth relationships`);

    if (dedicatedTimesWithBooths.length === 0) {
      console.log('✅ No DedicatedTime records with booth relationships found, migration complete');
      return;
    }

    // Create BoothDedicatedTime entries
    const boothDedicatedTimeEntries = [];
    let successCount = 0;
    let skipCount = 0;

    for (const dedicatedTime of dedicatedTimesWithBooths) {
      try {
        // Check if relationship already exists
        const existingRelation = await BoothDedicatedTimeModel.findOne({
          booth: dedicatedTime.booth,
          dedicatedTime: dedicatedTime._id
        });

        if (existingRelation) {
          console.log(`⚠️  Relationship already exists for DedicatedTime ${dedicatedTime._id} and Booth ${dedicatedTime.booth}`);
          skipCount++;
          continue;
        }

        // Create new BoothDedicatedTime entry
        const boothDedicatedTime = new BoothDedicatedTimeModel({
          booth: dedicatedTime.booth,
          dedicatedTime: dedicatedTime._id
        });

        await boothDedicatedTime.save();
        successCount++;

        console.log(`✅ Created BoothDedicatedTime: Booth ${dedicatedTime.booth} ↔ DedicatedTime ${dedicatedTime._id}`);

      } catch (error) {
        console.error(`❌ Failed to create BoothDedicatedTime for DedicatedTime ${dedicatedTime._id}:`, error.message);
        // Continue with other records rather than failing the entire migration
      }
    }

    console.log(`📈 Migration Summary:`);
    console.log(`   ✅ Successfully created: ${successCount} relationships`);
    console.log(`   ⚠️  Skipped (already exists): ${skipCount} relationships`);
    console.log(`   📊 Total processed: ${dedicatedTimesWithBooths.length} records`);

    console.log('✅ Booth-DedicatedTime migration completed successfully');

  } catch (error) {
    console.error('❌ Booth-DedicatedTime migration failed:', error.message);
    throw error;
  }
}