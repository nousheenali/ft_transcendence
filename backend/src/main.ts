import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'; // 👈 Import the SwaggerModule class
import { IoAdapter } from '@nestjs/platform-socket.io';
// import { WsAdapter } from '@nestjs/platform-ws';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.useWebSocketAdapter(new IoAdapter(app));
  //(CORS) is a mechanism that allows resources to be requested from another domain(NEXTJS frontend in our case)
  app.enableCors()


  // 👇 This block will initiate Swagger using SwaggerModule and DocumentBuilder. 👇
  // ----------------------------------------------------------------------------------------
  const config = new DocumentBuilder()
    .setTitle('Transcendence API')
    .setDescription('The Transcendence API description')
    .setVersion('0.1')
    .build();

  // const document = SwaggerModule.createDocument(app, config);
  // SwaggerModule.setup('api', app, document);
  // ----------------------------------------------------------------------------------------
  await app.listen(3001);
}
bootstrap();
