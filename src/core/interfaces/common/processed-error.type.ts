import { HttpStatus } from '@nestjs/common'
import { ApiProperty } from '@nestjs/swagger'

export interface IProcessedError {
  statusCode: HttpStatus
  message?: string
  messages?: Record<string, string | string[]>
  internalMessage: string
  timestamp: string
  path: string
}

export class ProcessedError400Type implements IProcessedError {
  @ApiProperty({ example: 400, description: 'http status of request' })
  statusCode: HttpStatus

  @ApiProperty({
    example: 'notifier:error.api.bad_request',
    description: 'JSON i18n key of error for toast in client '
  })
  message: string

  @ApiProperty({
    example:
      'Invalid query parameter:  by convention available only: eq,ne,like,notLike,gt,gte,lt,lte',
    description: 'internal error from api'
  })
  internalMessage: string

  @ApiProperty({
    example: '2023-08-19T17:42:15.033Z',
    description: 'date of request error in ISO format'
  })
  timestamp: string

  @ApiProperty({
    example: '/api/role/',
    description: 'url of this request'
  })
  path: string
}

export class ProcessedError404Type implements IProcessedError {
  @ApiProperty({ example: 404, description: 'http status of request' })
  statusCode: HttpStatus

  @ApiProperty({
    example: 'error:error.api.not_found',
    description: 'JSON i18n key of error for toast in client '
  })
  message: string

  @ApiProperty({
    example: 'No such Role',
    description: 'internal error from api'
  })
  internalMessage: string

  @ApiProperty({
    example: '2023-08-19T17:42:15.033Z',
    description: 'date of request error in ISO format'
  })
  timestamp: string

  @ApiProperty({
    example: '/api/role/',
    description: 'url of this request'
  })
  path: string
}

export class ProcessedError500Type implements IProcessedError {
  @ApiProperty({ example: 404, description: 'http status of request' })
  statusCode: HttpStatus

  @ApiProperty({
    example: 'notifier:error.api.internal_server_error',
    description: 'JSON i18n key of error for toast in client '
  })
  message: string

  @ApiProperty({
    example: 'Something wen wrong',
    description: 'internal error from api'
  })
  internalMessage: string

  @ApiProperty({
    example: '2023-08-19T17:42:15.033Z',
    description: 'date of request error in ISO format'
  })
  timestamp: string

  @ApiProperty({
    example: '/api/role/',
    description: 'url of this request'
  })
  path: string
}
