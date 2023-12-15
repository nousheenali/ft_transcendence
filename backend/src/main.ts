import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'; // 👈 Import the SwaggerModule class

// import { IoAdapter } from '@nestjs/platform-socket.io';
// import { WsAdapter } from '@nestjs/platform-ws';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.useWebSocketAdapter(new IoAdapter(app));
  //(CORS) is a mechanism that allows resources to be requested from another domain(NEXTJS frontend in our case)
  app.enableCors({
    origin: process.env.NEXT_PUBLIC_GATEWAY_URL, // Replace with your frontend URL
    credentials: true,
    allowedHeaders: 'Content-Type, Accept, Origin',
    preflightContinue: false,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });

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
  // Listen for shutdown signals (e.g., Ctrl+C) and handle gracefully
  const shutdownSignals: NodeJS.Signals[] = ['SIGTERM', 'SIGINT', 'SIGHUP'];
  shutdownSignals.forEach((signal) => {
    process.on(signal, () => {
      // Perform cleanup tasks here (e.g., closing database connections)
      //---------------------------------------------------------------------------------------
      

      //---------------------------------------------------------------------------------------
      // Close the Nest application gracefully
      app.close().then(() => {
        console.log(`Nest application closed gracefully on ${signal} signal`);
        process.exit(0);
      });
    });
  });

  // ----------------------------------------------------------------------------------------

  await app.listen(3001);
}
bootstrap();
