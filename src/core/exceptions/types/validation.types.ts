import { ApiProperty, getSchemaPath } from '@nestjs/swagger'

export class ValidationMessage {
  constructor(message?: string) {
    this.message = message
  }
  @ApiProperty()
  message?: string
}

export class ValidationError {
  constructor(target: string, messages: ValidationMessage[]) {
    this.target = target
    this.messages = messages
  }

  @ApiProperty()
  target: string
  @ApiProperty({
    items: { oneOf: [{ $ref: getSchemaPath(ValidationMessage) }] },
    type: 'array'
  })
  messages: ValidationMessage[]
}
