import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'; // 👈 Import the SwaggerModule class

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 👇 This block will initiate Swagger using SwaggerModule and DocumentBuilder. 👇
  // ----------------------------------------------------------------------------------------
  const config = new DocumentBuilder()
    .setTitle('Transcendence API')
    .setDescription('The Transcendence API description')
    .setVersion('0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  // ----------------------------------------------------------------------------------------
  await app.listen(3001);
}
bootstrap();
