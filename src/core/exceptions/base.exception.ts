import { HttpException, HttpStatus } from '@nestjs/common';
import { BaseExceptionResponseType } from '../types';

export class BaseException extends HttpException {
  constructor(response: BaseExceptionResponseType<any>, status: HttpStatus) {
    super(response, status);
  }
}
