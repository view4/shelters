#!/usr/bin/env node

/**
 * CLI Script: Generate Mock Subscription and Payment Data
 * 
 * Usage:
 *   ts-node -r tsconfig-paths/register src/transactions/cli/generate-mock-subscription-data.ts <userId>
 *   
 * Or add to package.json scripts:
 *   "transactions:generate-mock": "ts-node -r tsconfig-paths/register src/transactions/cli/generate-mock-subscription-data.ts"
 *   
 * Then run:
 *   npm run transactions:generate-mock 6941a7269b532ebb219129fe
 */

import * as mongoose from 'mongoose';
import { config } from 'dotenv';
import { 
  Subscription, 
  SubscriptionDocument, 
  SubscriptionSchema 
} from '../submodules/stripe/schemas/subscription.schema';
import { 
  SubscriptionPayment, 
  SubscriptionPaymentDocument, 
  SubscriptionPaymentSchema 
} from '../submodules/stripe/schemas/subscription-payment.schema';
import { User, UserDocument, UserSchema } from '../../auth/schemas/user.schema';
import { Model } from 'mongoose';

// Load environment variables
config();

async function generateMockSubscriptionData(userId: string): Promise<void> {
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
    // Get or create models
    let SubscriptionModel: Model<SubscriptionDocument>;
    if (connection.connection.models.Subscription) {
      SubscriptionModel = connection.connection.models.Subscription as Model<SubscriptionDocument>;
    } else {
      SubscriptionModel = connection.connection.model<SubscriptionDocument>('Subscription', SubscriptionSchema) as Model<SubscriptionDocument>;
    }

    let SubscriptionPaymentModel: Model<SubscriptionPaymentDocument>;
    if (connection.connection.models.SubscriptionPayment) {
      SubscriptionPaymentModel = connection.connection.models.SubscriptionPayment as Model<SubscriptionPaymentDocument>;
    } else {
      SubscriptionPaymentModel = connection.connection.model<SubscriptionPaymentDocument>('SubscriptionPayment', SubscriptionPaymentSchema) as Model<SubscriptionPaymentDocument>;
    }

    console.log('✅ Models initialized');

    // Get or create User model
    let UserModel: Model<UserDocument>;
    if (connection.connection.models.User) {
      UserModel = connection.connection.models.User as Model<UserDocument>;
    } else {
      UserModel = connection.connection.model<UserDocument>('User', UserSchema) as Model<UserDocument>;
    }

    // Validate userId format
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error(`Invalid user ID format: ${userId}`);
    }

    const userObjectId = new mongoose.Types.ObjectId(userId);

    // Verify user exists
    console.log(`🔍 Verifying user exists: ${userId}`);
    const user = await UserModel.findById(userObjectId);
    if (!user) {
      throw new Error(`User not found with ID: ${userId}`);
    }
    console.log(`✅ User found: ${user.email || 'No email'}`);

    console.log(`🔍 Generating mock data for user: ${userId}`);

    // Check if subscription already exists
    const existingSubscription = await SubscriptionModel.findOne({ user: userObjectId });
    
    let subscription: SubscriptionDocument;
    
    if (existingSubscription) {
      console.log('⚠️  Subscription already exists, using existing subscription');
      subscription = existingSubscription;
    } else {
      // Create mock subscription
      const subscriptionData = {
        user: userObjectId,
        customerId: `cus_mock_${Date.now()}`,
        subscriptionId: `sub_mock_${Date.now()}`,
        stamps: {
          activatedDate: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000), // 180 days ago
          deactivatedDate: null, // Still active
        },
      };

      subscription = await SubscriptionModel.create(subscriptionData);
      console.log(`✅ Created subscription: ${subscription._id}`);
      console.log(`   Customer ID: ${subscription.customerId}`);
      console.log(`   Subscription ID: ${subscription.subscriptionId}`);
      console.log(`   Activated: ${subscription.stamps?.activatedDate}`);
      
      // Verify the subscription was saved
      const verifySubscription = await SubscriptionModel.findById(subscription._id);
      if (!verifySubscription) {
        throw new Error('Failed to create subscription - verification failed');
      }
    }

    // Generate historical payments (12 months of monthly payments)
    const paymentsToCreate = [];
    const now = new Date();
    const subscriptionId = subscription._id;

    // Generate 12 months of payments going back in time
    for (let i = 0; i < 12; i++) {
      const paymentDate = new Date(now);
      paymentDate.setMonth(now.getMonth() - i);
      paymentDate.setDate(1); // First of the month
      paymentDate.setHours(12, 0, 0, 0); // Noon

      // Most payments are successful, but add some variety
      let status: "pending" | "paid" | "failed" = "paid";
      if (i === 2) {
        status = "failed"; // One failed payment 3 months ago
      } else if (i === 0) {
        status = "pending"; // Most recent payment (this month) is pending
      }

      // Mock payment amounts (in cents, as strings for consistency with schema)
      const baseAmount = 2999; // $29.99 base
      const amount = (baseAmount + Math.floor(Math.random() * 500)).toString(); // Add some variation

      const paymentData = {
        user: userObjectId,
        externalId: `inv_mock_${userId}_${paymentDate.getTime()}_${i}`,
        amount: amount,
        currency: 'usd',
        subscription: subscriptionId,
        paidAt: paymentDate,
        status: status,
      };

      paymentsToCreate.push(paymentData);
    }

    // Check for existing payments and only create new ones
    const existingPayments = await SubscriptionPaymentModel.find({ 
      subscription: subscriptionId 
    });
    
    const existingExternalIds = new Set(existingPayments.map(p => p.externalId));
    const newPayments = paymentsToCreate.filter(p => !existingExternalIds.has(p.externalId));

    if (newPayments.length > 0) {
      console.log(`📝 Attempting to create ${newPayments.length} payment records...`);
      const createdPayments = await SubscriptionPaymentModel.insertMany(newPayments, { ordered: false });
      console.log(`✅ Created ${createdPayments.length} payment records`);
      
      // Summary by status
      const statusCounts = createdPayments.reduce((acc, payment) => {
        acc[payment.status] = (acc[payment.status] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      
      console.log('   Payment status breakdown:');
      Object.entries(statusCounts).forEach(([status, count]) => {
        console.log(`     ${status}: ${count}`);
      });
    } else {
      console.log('⚠️  All payments already exist for this subscription');
    }

    // Display summary
    const allPayments = await SubscriptionPaymentModel.find({ subscription: subscriptionId });
    console.log(`\n📊 Summary:`);
    console.log(`   Subscription ID: ${subscription._id}`);
    console.log(`   Total Payments: ${allPayments.length}`);
    console.log(`   Active Subscription: ${!subscription.stamps?.deactivatedDate ? 'Yes' : 'No'}`);

  } catch (error) {
    console.error('❌ Error during data generation:', error);
    throw error;
  } finally {
    await connection.connection.close();
    console.log('\n🔌 Disconnected from MongoDB');
  }
}

async function main() {
  const [, , userId] = process.argv;

  if (!userId) {
    console.log('📚 Generate Mock Subscription Data CLI');
    console.log('======================================');
    console.log('Usage:');
    console.log('  ts-node -r tsconfig-paths/register src/transactions/cli/generate-mock-subscription-data.ts <userId>');
    console.log('');
    console.log('Or use npm script:');
    console.log('  npm run transactions:generate-mock <userId>');
    console.log('');
    console.log('Example:');
    console.log('  npm run transactions:generate-mock 6941a7269b532ebb219129fe');
    console.log('');
    console.log('Environment Variables Required:');
    console.log('  MONGO_URL - MongoDB connection string');
    process.exit(1);
  }

  try {
    await generateMockSubscriptionData(userId);
    console.log('\n✅ Successfully generated mock subscription data!');
  } catch (error) {
    console.error('\n💥 Error:', error.message);
    if (error.stack) {
      console.error(error.stack);
    }
    process.exit(1);
  }
}

// Run if this file is executed directly
if (require.main === module) {
  main().catch(console.error);
}

export { generateMockSubscriptionData };

