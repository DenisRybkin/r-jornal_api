import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from './core/modules/shared/shared.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ApiConfigService } from './core/modules/shared/services/api-config.service';
import { AsyncContextModule } from './core/modules/async-context/async-context.module';
import { AsyncContextMiddleware } from './core/middlewares/async-context.middleware';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './core/exception-filters/all-exceptions.filter';
import { UniqueValidator } from './core/validators/unique.validator';

@Module({
  imports: [
    SharedModule.forRoot({ isGlobal: true }),
    AsyncContextModule.forRoot({ isGlobal: true }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRootAsync({
      imports: [SharedModule],
      useFactory: (configService: ApiConfigService) => configService.dbConfig,
      inject: [ApiConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [
    UniqueValidator,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AsyncContextMiddleware).forRoutes('*');
  }
}
