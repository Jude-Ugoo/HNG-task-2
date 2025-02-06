import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import serverless from 'serverless-http';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './exceptions/http-exception.filter';

// Create an Express instance that will serve as the underlying HTTP server.
const server = express();

async function bootstrapServer() {
  // Create the NestJS app using the Express adapter.
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  // Enable CORS.
  app.enableCors();

  // Set up global pipes and exception filters.
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());

  // IMPORTANT: Do not call app.listen() in a serverless setup.
  await app.init();

  return server;
}

// Create a promise to ensure the app is bootstrapped before handling requests.
const bootstrapPromise = bootstrapServer();

// Export the serverless handler.
export const handler = async (event: any, context: any) => {
  const expressApp = await bootstrapPromise;
  // Wrap the Express app with serverless-http.
  const handlerFunction = serverless(expressApp);
  return handlerFunction(event, context);
};
