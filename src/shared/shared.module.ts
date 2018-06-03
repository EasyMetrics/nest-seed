import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';

import { AuthMiddleware, LoggerMiddleware } from './middlewares';

@Module({
  modules: [],
  controllers: [],
  components: [AuthMiddleware, LoggerMiddleware],
  exports: [AuthMiddleware, LoggerMiddleware],
})
export class SharedModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*');
  }
}
