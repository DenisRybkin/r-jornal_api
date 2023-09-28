import { NestFactory } from '@nestjs/core'
import {
  ExpressAdapter,
  NestExpressApplication
} from '@nestjs/platform-express'
import { SwaggerModule } from '@nestjs/swagger'
import { useContainer } from 'class-validator'
import cookieParser from 'cookie-parser'
import { AppModule } from './app.module'
import { ApiConfigService } from './core/modules/shared/services/api-config.service'
import { SwaggerConfigProvider } from './core/modules/shared/services/swagger-config.service'
import { SharedModule } from './core/modules/shared/shared.module'
import { writeFileSync } from 'node:fs'
import { join } from 'node:path'

const bootstrap = async () => {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter()
  )

  const configService = app.select(SharedModule).get(ApiConfigService)

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
  buildSwagger(app)
  await app.listen(configService.appConfig.port)
}

const buildSwagger = async (app: NestExpressApplication) => {
  const swaggerService = app.select(SharedModule).get(SwaggerConfigProvider)
  const swaggerDocument = SwaggerModule.createDocument(
    app,
    swaggerService.documentBuilder,
    { extraModels: swaggerService.extraModels }
  )
  writeFileSync(
    join(__dirname, 'static', 'spec.json'),
    JSON.stringify(swaggerDocument)
  )
  SwaggerModule.setup(swaggerService.docsPrefix, app, swaggerDocument, {
    swaggerOptions: {
      persistAuthorization: true
    }
  })
}

bootstrap()
