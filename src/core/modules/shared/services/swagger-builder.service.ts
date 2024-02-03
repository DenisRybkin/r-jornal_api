import { Injectable } from '@nestjs/common'
import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { NestExpressApplication } from '@nestjs/platform-express'
import { SharedModule } from '../shared.module'
import { SwaggerConfigProvider } from './swagger-config.service'
import { SwaggerModule } from '@nestjs/swagger'

@Injectable()
export class SwaggerBuilderService {
  public static specDirectory = join(__dirname, 'static')
  public static specPath = join(
    SwaggerBuilderService.specDirectory,
    'spec.json'
  )

  public async buildThroughApp(app: NestExpressApplication) {
    const swaggerService = app.select(SharedModule).get(SwaggerConfigProvider)
    const swaggerDocument = SwaggerModule.createDocument(
      app,
      swaggerService.documentBuilder,
      { extraModels: swaggerService.extraModels }
    )
    if (!existsSync(SwaggerBuilderService.specDirectory))
      mkdirSync(SwaggerBuilderService.specDirectory)

    writeFileSync(
      SwaggerBuilderService.specPath,
      JSON.stringify(swaggerDocument)
    )
    SwaggerModule.setup(swaggerService.docsPrefix, app, swaggerDocument, {
      swaggerOptions: {
        persistAuthorization: true
      }
    })
  }
}
