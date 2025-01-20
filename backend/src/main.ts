import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  console.log("being called...", process.env.MONGO_URL);
  // process.env.MONO_URI = process.env.MONGO_URL;

  const app = await NestFactory.create(AppModule);
  console.log("created app...")
  console.log("RUNNING ON PORT:", process.env.PORT ?? 3001);
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
