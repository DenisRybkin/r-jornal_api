import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from './core/modules/shared/shared.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ApiConfigService } from './core/modules/shared/services/api-config.service';
import { AsyncContextModule } from './core/modules/async-context/async-context.module';
import { AsyncContextMiddleware } from './core/middlewares';
import { APP_FILTER, APP_GUARD, APP_PIPE } from '@nestjs/core';
import { AllExceptionsFilter } from './core/exception-filters/all-exceptions.filter';
import { UniqueValidator } from './core/validators';
import { AuthGuard, RolesGuard } from './core/guards';
import { JwtService } from '@nestjs/jwt';
import { ErrorsValidationPipe } from './core/pipes';
import { RoleModule } from './modules/role/role.module';

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
    RoleModule,
  ],
  controllers: [AppController],
  providers: [
    JwtService,
    UniqueValidator,
    /*{
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },*/
    {
      provide: APP_PIPE,
      useClass: ErrorsValidationPipe,
    },
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
