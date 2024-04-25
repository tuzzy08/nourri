import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

// * Setup Swagger
const swaggerConfig = new DocumentBuilder()
  .setTitle('Nourri')
  .setDescription('Nourri API description')
  .setVersion('1.0')
  .addTag('nourri')
  .build();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);
  await app.listen(8080);
}
bootstrap();
