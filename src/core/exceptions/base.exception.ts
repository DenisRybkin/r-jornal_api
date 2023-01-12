import { HttpException, HttpStatus } from '@nestjs/common';
import { BaseExceptionResponseType } from '../types/base-exception-response.type';

export class BaseException extends HttpException {
  constructor(response: BaseExceptionResponseType<any>, status: HttpStatus) {
    super(response, status);
  }
}
