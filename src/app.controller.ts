import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags
} from '@nestjs/swagger'
import { Controller } from '@nestjs/common'
import { Get } from '@nestjs/common/decorators'
import { IsPublic } from './core/decorators'
import { ProcessedError500Type } from './core/interfaces/common/processed-error.type'

@ApiTags('App')
@Controller('app')
export class AppController {
  @ApiOperation({ summary: 'Ping Pong endpoint' })
  @ApiOkResponse({
    status: 200,
    type: 'pong',
    description: 'Return "pong" if servers is ok state'
  })
  @ApiInternalServerErrorResponse({ status: 500, type: ProcessedError500Type })
  @IsPublic()
  @Get('ping')
  public ping(): string {
    return 'pong'
  }
}
