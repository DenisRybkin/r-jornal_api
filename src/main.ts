import { NestFactory } from '@nestjs/core'
import {
  ExpressAdapter,
  NestExpressApplication
} from '@nestjs/platform-express'
import { useContainer } from 'class-validator'
import cookieParser from 'cookie-parser'
import { AppModule } from './app.module'
import { ApiConfigService } from './core/modules/shared/services/api-config.service'
import { SharedModule } from './core/modules/shared/shared.module'
import { SwaggerBuilderService } from './core/modules/shared/services/swagger-builder.service'

const bootstrap = async () => {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter()
  )

  const configService = app.select(SharedModule).get(ApiConfigService)
  const swaggerBuilder = app.select(SharedModule).get(SwaggerBuilderService)

  app.use(cookieParser())
  app.setGlobalPrefix('api')
  app.enableCors({
    origin: true,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    credentials: true,
    allowedHeaders:
      'X-Requested-With, Origin, X-HTTP-Method-Override, Content-Type, Accept, Observe, Authorization'
    //allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept'
  })
  useContainer(app.select(AppModule), { fallbackOnErrors: true })
  await Promise.all([
    swaggerBuilder.buildThroughApp(app),
    app.listen(configService.appConfig.port)
  ])
}

bootstrap()
