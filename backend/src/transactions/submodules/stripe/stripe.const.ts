export const PAYMENT_INTENT_EVENTS = {
  SUCCEEDED: 'payment_intent.succeeded',
  NULL: 'null',
} as Record<'SUCCEEDED' | 'NULL', string>;

export const SUBSCRIPION_EVENTS = {
  CREATED: 'customer.subscription.created',
  UPDATED: 'customer.subscription.updated',
  DELETED: 'customer.subscription.deleted',
}

export const STRIPE_ACCOUNT_TYPES = {
  EXPRESS: "express"
} as const;

export const INVOICE_EVENTS = {
  CREATED: 'invoice.created',
  PAID: 'invoice.paid',
  FAILED: 'invoice.payment_failed',
  NULL: 'null',
} as Record<'CREATED' | 'PAID' | 'FAILED' | 'NULL', string>;

