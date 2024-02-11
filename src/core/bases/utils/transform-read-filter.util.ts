import { ClassConstructor } from 'class-transformer'
import { Query } from 'express-serve-static-core'
import { Op, WhereOptions } from 'sequelize'
import { Model } from 'sequelize-typescript'
import {
  ConstraintMessagesConstants,
  ErrorMessagesConstants
} from 'src/core/constants'
import { QueryNamingConventionConstants } from 'src/core/constants/query-naming-convention.constants'
import { BadRequestException } from 'src/core/exceptions/build-in'
import { ReadAssociatedFilter, ReadFilter } from 'src/core/interfaces/common'
import { validateByDto } from 'src/core/validators'
import { Attributes } from 'sequelize/types/model'

export interface TransformedQuery {
  filters: ReadFilter[]
  associatedFilters: ReadAssociatedFilter[]
}

export interface TransformedReadFilters<T extends Model<T, any>> {
  filters: WhereOptions<Attributes<T>>
  associatedFilters: ReadAssociatedFilter[]
}

const transformBoolean = (value: 'true' | 'false'): boolean => value != 'false'
const transformArray = (value: string): number[] | string[] => {
  const divided = value.split(',')
  if (divided.every(item => typeof Number.isNaN(Number(item)) == 'number'))
    return divided.map(item => Number(item))
  return divided
}

export const transformQueriesFilter = <T extends Model<T, any>>(
  query: Query
): TransformedQuery => {
  const defaultTransformedQuery: TransformedQuery = {
    filters: [],
    associatedFilters: []
  }
  if (!Object.keys(query).length) return defaultTransformedQuery
  return Object.entries(query).reduce((acc, [key, value]) => {
    const [filterBy, conventionType, associatedModel] = key
      .toString()
      .split('.')

    if (
      !conventionType ||
      !Object.values(QueryNamingConventionConstants).includes(
        conventionType as QueryNamingConventionConstants
      )
    )
      throw new BadRequestException(
        ErrorMessagesConstants.BadRequest,
        `Invalid query parameter: ${conventionType}, by convention available only: ${Object.values(
          QueryNamingConventionConstants
        )}`
      )

    const transformedQuery = {
      key: filterBy,
      value: value as string,
      filterType: conventionType as QueryNamingConventionConstants,
      ...(associatedModel && { associatedModel })
    }

    if ('associatedModel' in transformedQuery)
      acc.associatedFilters.push(transformedQuery as ReadAssociatedFilter)
    else acc.filters.push(transformedQuery)

    return acc
  }, defaultTransformedQuery)
}

export const getOperationByConventionConstant = (
  constant: QueryNamingConventionConstants
): symbol => {
  switch (constant) {
    case QueryNamingConventionConstants.Equal:
      return Op.eq
    case QueryNamingConventionConstants.NotEqual:
      return Op.ne
    case QueryNamingConventionConstants.Like:
      return Op.iLike
    case QueryNamingConventionConstants.NotLike:
      return Op.notILike
    case QueryNamingConventionConstants.GreaterThan:
      return Op.gt
    case QueryNamingConventionConstants.GreaterThanOrEqual:
      return Op.gte
    case QueryNamingConventionConstants.LessThan:
      return Op.lt
    case QueryNamingConventionConstants.LessThanOrEqual:
      return Op.lte
    case QueryNamingConventionConstants.Or:
      return Op.or
    default:
      return Op.eq
  }
}

const transformQueryValueByOperationType = (
  value: string,
  operationType: QueryNamingConventionConstants
): string | number | boolean | number[] | string[] => {
  if (value == 'true' || value == 'false') return transformBoolean(value)
  switch (operationType) {
    case QueryNamingConventionConstants.Equal:
    case QueryNamingConventionConstants.NotEqual:
      return Number.isNaN(Number(value)) ? value : Number(value)
    case QueryNamingConventionConstants.Like:
    case QueryNamingConventionConstants.NotLike:
      return `%${value}%`
    case QueryNamingConventionConstants.GreaterThan:
    case QueryNamingConventionConstants.GreaterThanOrEqual:
    case QueryNamingConventionConstants.LessThan:
    case QueryNamingConventionConstants.LessThanOrEqual: {
      console.log(typeof value, ' ', value)
      if (Number.isNaN(Number(value)))
        throw new BadRequestException(
          ConstraintMessagesConstants.MustBeNumber,
          `Invalid query value: ${value}`
        )
      return Number(value)
    }
    case QueryNamingConventionConstants.Or:
      return transformArray(value)
    default:
      return value
  }
}

export const transformReadFilters = async <T extends Model<T, any>>(
  transformedQueries: TransformedQuery,
  dto: ClassConstructor<any>
): Promise<TransformedReadFilters<T>> => {
  const withTransformedValueFilters: ReadFilter[] =
    transformedQueries.filters.map(item => ({
      ...item,
      value: transformQueryValueByOperationType(
        item.value as string,
        item.filterType
      )
    }))
  const withTransformedValueAssociatedFilters: ReadAssociatedFilter[] =
    transformedQueries.associatedFilters.map(item => ({
      ...item,
      value: transformQueryValueByOperationType(
        item.value as string,
        item.filterType
      )
    }))
  const whereOpts = Object.assign(
    {},
    ...[
      ...withTransformedValueFilters,
      ...withTransformedValueAssociatedFilters
    ].map(readFilter => ({
      [readFilter.key]: readFilter.value
    }))
  )
  console.log(whereOpts)
  await validateByDto(dto, whereOpts, {
    skipMissingProperties: true,
    whitelist: true,
    forbidNonWhitelisted: true
  })

  return {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    filters: withTransformedValueFilters.map(filter => ({
      [filter.key as keyof T]: {
        [getOperationByConventionConstant(filter.filterType)]: filter.value
      }
    })),
    associatedFilters: withTransformedValueAssociatedFilters
  }
}
