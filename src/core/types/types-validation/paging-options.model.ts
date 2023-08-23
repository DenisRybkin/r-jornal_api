import { IsEnum, IsInt, IsOptional } from 'class-validator'
import { ConstraintMessagesConstants } from '../../constants'
import { IPagingOptions, OrderType } from '../../interfaces/common'
import { Order } from '../../interfaces/common/order.type'

export class PagingOptions implements Partial<IPagingOptions> {
  @IsOptional()
  @IsInt({ message: ConstraintMessagesConstants.MustBeInteger })
  readonly page?: number

  @IsOptional()
  @IsInt({ message: ConstraintMessagesConstants.MustBeInteger })
  readonly pageSize?: number

  @IsOptional()
  @IsEnum(Order, {
    message: 'invaluable value of order',
    context: {
      availableValues: Object.values(Order)
    }
  })
  order?: OrderType
}
