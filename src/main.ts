import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';

import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as https from 'https';

import { ExpressInstance } from './express-instance';
import { Environments } from './environments';
import { AppModule } from './app.module';

if (fs.existsSync('.env')) {
  require('dotenv').config(); // tslint:disable-line
}

const logger = new Logger('HttpsServer');
const expressInstance = new ExpressInstance();
const app = expressInstance.bootstrap();

async function bootstrap() {
  const server = await NestFactory.create(AppModule, app);
  server.connectMicroservice({
    transport: Transport.REDIS,
    options: {
      url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
      retryAttempts: 5,
      retryDelay: 3000,
    },
  });
  server.setGlobalPrefix(app.get('prefix'));
  server.init();
  await server.startAllMicroservicesAsync();
}
bootstrap();

const options = {
  key: app.get('key'),
  cert: app.get('cert'),
  ca: app.get('ca'),
};

const httpsInstance = https.createServer(options, app).listen(app.get('port'));
httpsInstance.on('listening', () => {
  logger.log('');
  logger.log('');
  logger.log(
    `NestJS Service ready and running on ${app.get('host')}:${app.get('port')}`,
  );
  logger.log(``);
  logger.log(`-------------------------------------------------------`);
  logger.log(`Environment  : ${Environments.getEnv()}`);
  logger.log(`Version      : ${Environments.getPackageVersion()}`);
  logger.log(``);
  logger.log(`-------------------------------------------------------`);
  logger.log(``);
});
