import { BaseException } from '../base.exception';
import { ValidationError } from '../types/validation.types';
import { ErrorMessagesConstants } from '../../constants';
import { HttpStatus } from '@nestjs/common';

export class ValidationException extends BaseException<ValidationError> {
  constructor(response: ValidationError[]) {
    super(
      {
        message: ErrorMessagesConstants.ValidationError,
        messages: response,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
