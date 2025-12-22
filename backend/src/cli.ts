#!/usr/bin/env node

import { CommandFactory } from 'nest-commander';
import { AdminCliModule } from './admin/admin-cli.module';

async function bootstrap() {
  await CommandFactory.run(AdminCliModule, {
    logger: ['error', 'warn'],
  });
}

bootstrap();

