import { ApiProperty, getSchemaPath } from '@nestjs/swagger'

export class ValidationMessageType {
  constructor(message?: string) {
    this.message = message
  }
  @ApiProperty()
  message?: string
}

export class ValidationErrorType {
  constructor(target: string, messages: ValidationMessageType[]) {
    this.target = target
    this.messages = messages
  }

  @ApiProperty()
  target: string
  @ApiProperty({
    items: { oneOf: [{ $ref: getSchemaPath(ValidationMessageType) }] },
    type: 'array'
  })
  messages: ValidationMessageType[]
}
