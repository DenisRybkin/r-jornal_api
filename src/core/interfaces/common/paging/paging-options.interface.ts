import { ApiPropertyOptional } from '@nestjs/swagger'
import { Order, OrderType } from '../order.type'
import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator'

export interface IPagingOptions {
  page: number
  pageSize: number
  order: OrderType
  orderBy: string
}

export interface QueryOptionsWithPaging extends Partial<IPagingOptions> {}

export class PagingOptionsType implements IPagingOptions {
  @ApiPropertyOptional({
    example: 1,
    description: 'number of page',
    default: 1
  })
  @IsOptional()
  @IsInt()
  page: number

  @ApiPropertyOptional({
    example: 10,
    description: 'count items of page',
    default: 10
  })
  @IsOptional()
  @IsInt()
  pageSize: number

  @ApiPropertyOptional({
    example: Order.desc,
    description: 'oder for sorting (asc | desc)',
    default: Order.desc
  })
  @IsOptional()
  @IsEnum(Order)
  order: Order

  @ApiPropertyOptional({
    example: 'createdAt',
    description: 'filed for ordering',
    default: 'createdAt'
  })
  @IsOptional()
  @IsString()
  orderBy: string
}
