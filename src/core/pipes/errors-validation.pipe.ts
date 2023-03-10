import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidationException } from '../exceptions/custom';

@Injectable()
export class ErrorsValidationPipe implements PipeTransform {
  private static JsNativeTypes: Function[] = [
    String,
    Boolean,
    Number,
    Symbol,
    Array,
    Object,
  ];

  async transform(value: any, { metatype }: ArgumentMetadata): Promise<any> {
    if (!metatype || !this.toValidate(metatype)) return value;

    const target = plainToClass(metatype, value);
    const errors = await validate(target);

    if (errors.length)
      throw new ValidationException(
        errors.map(({ property, constraints, contexts }) => ({
          target: property,
          messages: Object.keys(constraints ?? {}).map((key) => ({
            message: constraints?.[key] || null,
            context: contexts?.[key],
          })),
        })),
      );

    return value;
  }

  private toValidate(metatype: Function): boolean {
    return !ErrorsValidationPipe.JsNativeTypes.includes(metatype);
  }
}
