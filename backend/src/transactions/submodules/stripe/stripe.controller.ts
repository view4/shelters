import { Body, Controller, Post } from '@nestjs/common';
import { StripeService } from './stripe.service';

@Controller('stripe')
export class StripeController {
  constructor(private readonly service: StripeService) { }

  @Post("/webhook")
  async webhook(@Body() body: any): Promise<string> {
    try {
      console.log("STRIPE BEING HIT")
      console.log("STRIPE BODY", body)
      // I think that this should be secured as well, to prevent abuse of the system in some way - it can be done later.
      await this.service.handleEvent(body);
      return "response"

    } catch (e) {
      console.log("ERROR")
      console.error("ERROR", e)
      return "error"
    }
  }
}
