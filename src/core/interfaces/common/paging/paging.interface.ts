import { ApiProperty } from '@nestjs/swagger'
import { IPagingOptions } from './'

export type IPaging<T> = {
  pagingOptions: IPagingOptions
  totalItems?: number
  totalPages?: number
  items: T[]
}

// name of the this class for swagger
export class PagingType<T> implements Partial<IPaging<T>> {
  pagingOptions: IPagingOptions

  @ApiProperty({ example: 15, description: 'count items' })
  totalItems: number

  @ApiProperty({
    example: 2,
    description: 'count pages by page size (default: 10)'
  })
  totalPages: number

  items: T[]
}
