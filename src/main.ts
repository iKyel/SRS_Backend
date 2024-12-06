import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Bật CORS
  app.enableCors({
    origin: 'http://localhost:3001',  // Địa chỉ frontend của bạn
    methods: 'GET,POST,PUT,DELETE,PATCH',   // Các phương thức HTTP cho phép
    allowedHeaders: 'Content-Type',   // Các header cho phép
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
