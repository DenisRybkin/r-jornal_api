import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';
import cookieParser from 'cookie-parser';
import { useContainer } from 'class-validator';
import { SharedModule } from './core/modules/shared/shared.module';
import { ApiConfigService } from './core/modules/shared/services/api-config.service';

const bootstrap = async () => {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(),
    { cors: true },
  );

  const configService = app.select(SharedModule).get(ApiConfigService);
  const { port } = configService.appConfig;

  app.use(cookieParser());
  app.setGlobalPrefix('api');
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(port);
};
bootstrap();
