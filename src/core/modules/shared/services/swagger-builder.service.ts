import { Injectable } from '@nestjs/common'
import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { NestExpressApplication } from '@nestjs/platform-express'
import { SharedModule } from '../shared.module'
import { SwaggerConfigProvider } from './swagger-config.service'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

@Injectable()
export class SwaggerBuilderService {
  public static specDirectory = join(__dirname, 'static')
  public static specPath = join(
    SwaggerBuilderService.specDirectory,
    'spec.json'
  )
  public static documentUri = '/api/docs'

  private documentBuilder = new DocumentBuilder()
    .setTitle('API')
    .setDescription('REST API docs of r-journal platform')
    .addBearerAuth({ type: 'http', name: 'bearer' })
    .setVersion('1.0')
    .addTag('Created by Denis Rybkin')
    .setContact(
      'Denis Rybkin',
      'https://github.com/DenisRybkin',
      'denis.rybkin.94@mail.ru'
    )
    .build()

  public async buildThroughApp(app: NestExpressApplication) {
    const swaggerService = app.select(SharedModule).get(SwaggerConfigProvider)
    const swaggerDocument = SwaggerModule.createDocument(
      app,
      this.documentBuilder,
      { extraModels: swaggerService.extraModels }
    )
    if (!existsSync(SwaggerBuilderService.specDirectory))
      mkdirSync(SwaggerBuilderService.specDirectory)

    writeFileSync(
      SwaggerBuilderService.specPath,
      JSON.stringify(swaggerDocument)
    )

    SwaggerModule.setup(
      SwaggerBuilderService.documentUri,
      app,
      swaggerDocument,
      {
        swaggerOptions: {
          persistAuthorization: true
        }
      }
    )
  }
}
