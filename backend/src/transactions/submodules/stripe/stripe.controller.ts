import { Body, Controller, Post } from '@nestjs/common';
import { StripeService } from './stripe.service';

@Controller('stripe')
export class StripeController {
  constructor(private readonly service: StripeService) {}

  @Post("/webhook")
  webhook(@Body() body: any): Promise<void> {
    // I think that this should be secured as well, to prevent abuse of the system in some way - it can be done later.
    return this.service.handleEvent(body);
  }
}
