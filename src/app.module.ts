import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from './core/modules/shared/shared.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ApiConfigService } from './core/modules/shared/services/api-config.service';
import { AsyncContextModule } from './core/modules/async-context/async-context.module';
import { AsyncContextMiddleware } from './core/middlewares/async-context.middleware';

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
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AsyncContextMiddleware).forRoutes('*');
  }
}
