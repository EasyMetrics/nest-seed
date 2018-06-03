import { Component, Logger } from '@nestjs/common';

import * as express from 'express';

import { ExpressBootstrap } from './express-bootstrap';
import { ExpressConfiguration } from './express-config';
import { Environments } from './environments';

export interface Configuration {
  configure(app: ExpressInstance): void;
}

export class ExpressInstance {
  private readonly logger = new Logger(ExpressInstance.name);
  private express: express.Application = express();
  private ExpressBootstrap = new ExpressBootstrap();
  private expressConfig = new ExpressConfiguration();

  constructor() {}

  public bootstrap() {
    this.logger.log('Configuring Express Options');
    this.ExpressBootstrap.expressAppDefinition(this.express);
    this.expressConfig.configure(this.express);
    return this.express;
  }
}
