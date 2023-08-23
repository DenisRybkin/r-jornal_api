import { ClassConstructor, plainToClass } from 'class-transformer'
import { validate, ValidatorOptions } from 'class-validator'
import { ValidationException } from '../exceptions/custom'

export const validateByDto = async <T extends ClassConstructor<any>>(
  dto: T,
  validatedObj: Object,
  opts?: ValidatorOptions
) => {
  const plannedClass = plainToClass(dto, validatedObj)
  const errors = await validate(plannedClass, opts)

  if (errors.length)
    new ValidationException(
      errors.map(({ property, constraints, contexts }) => ({
        target: property,
        messages: Object.keys(constraints ?? {}).map(key => ({
          message: constraints?.[key] || null,
          context: contexts?.[key]
        }))
      }))
    )

  return dto
}
