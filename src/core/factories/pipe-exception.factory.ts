import { BadRequestException } from '../exceptions/build-in/bad-request.exception';
import { ApiErrorConstants } from '../constants/api-error.constants';

export const PipeExceptionFactory =
  (target: string, constrains: string[]) => (error: string) =>
    new BadRequestException(ApiErrorConstants.BadRequest, error, [
      { target, messages: constrains.map((message) => ({ message })) },
    ]);
