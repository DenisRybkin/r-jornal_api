import { BaseException } from '../base.exception';
import { HttpStatus } from '@nestjs/common';

export class BadRequestException extends BaseException {
  constructor(message: string, internalMessage?: string, messages?: any[]) {
    super({ message, internalMessage, messages }, HttpStatus.BAD_REQUEST);
  }
}
