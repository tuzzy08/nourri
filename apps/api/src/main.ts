import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // * Setup Swagger
  const config = new DocumentBuilder()
    .setTitle('Nourri')
    .setDescription('Nourri API description')
    .setVersion('1.0')
    .addTag('nourri')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3003);
}
bootstrap();
