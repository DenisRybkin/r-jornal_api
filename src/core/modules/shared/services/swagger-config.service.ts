import { Injectable } from '@nestjs/common'
import { DocumentBuilder } from '@nestjs/swagger'
import { ApiConfigService } from './api-config.service'

@Injectable()
export class SwaggerConfigProvider {
  constructor(private readonly configService: ApiConfigService) {}

  public documentBuilder = new DocumentBuilder()
    .setTitle('API')
    .setDescription('REST API docs of r-journal platform')
    .addBearerAuth()
    .setVersion('1.0')
    .addTag('Created by Denis Rybkin')
    .setContact(
      'Denis Rybkin',
      'https://github.com/DenisRybkin',
      'denis.rybkin.94@mail.ru'
    )
    .build()

  public docsPrefix = '/api/docs'
}
