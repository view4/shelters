import { createParamDecorator } from '@nestjs/common';

export const SessionUser = createParamDecorator((data, context) => {
  const ctx = context.getArgByIndex(2);
  if (!ctx.user) throw new Error('User not authorized');
  return ctx.user;
});

export const OptionalSessionUser = createParamDecorator((data, context) => {
  const ctx = context.getArgByIndex(2);
  return ctx?.user;
});
