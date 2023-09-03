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
import { unlink } from 'fs'
import { join } from 'path'

const bootstrap = async () => {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(),
    { cors: true }
  )

  const configService = app.select(SharedModule).get(ApiConfigService)

  const { port } = configService.appConfig

  app.use(cookieParser())
  app.setGlobalPrefix('api')
  //app.enableCors({})
  useContainer(app.select(AppModule), { fallbackOnErrors: true })
  buildSwagger(app)
  await app.listen(port)
}

const buildSwagger = (app: NestExpressApplication) => {
  const swaggerService = app.select(SharedModule).get(SwaggerConfigProvider)
  const documentSwagger = SwaggerModule.createDocument(
    app,
    swaggerService.documentBuilder,
    { extraModels: swaggerService.extraModels }
  )
  SwaggerModule.setup(swaggerService.docsPrefix, app, documentSwagger)
}

bootstrap()
