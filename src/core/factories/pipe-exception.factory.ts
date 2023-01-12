import { BadRequestException } from '../exceptions/build-in';
import { ErrorMessagesConstants } from '../constants';

export const PipeExceptionFactory =
  (target: string, constrains: string[]) => (error: string) =>
    new BadRequestException(ErrorMessagesConstants.BadRequest, error, [
      { target, messages: constrains.map((message) => ({ message })) },
    ]);
