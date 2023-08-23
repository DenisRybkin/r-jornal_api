import { ApiProperty } from '@nestjs/swagger'
import { Order, OrderType } from '../order.type'

export interface IPagingOptions {
  page: number
  pageSize: number
  order: OrderType
}

export interface QueryOptionsWithPaging extends Partial<IPagingOptions> {}

export class PagingOptionsType implements IPagingOptions {
  @ApiProperty({
    example: 1,
    description: 'number of page',
    required: false,
    default: 1
  })
  page: number

  @ApiProperty({
    example: 10,
    description: 'count items of page',
    required: false,
    default: 10
  })
  pageSize: number

  @ApiProperty({
    example: Order.desc,
    description: 'oder for sorting (asc | desc)',
    required: false,
    default: Order.desc
  })
  order: OrderType
}
