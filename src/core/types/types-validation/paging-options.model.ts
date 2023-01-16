import { OrderType, IPagingOptions } from '../../interfaces/common';
import { IsEnum, IsInt, IsOptional } from 'class-validator';
import { ConstraintMessagesConstants } from '../../constants';
import { Order } from '../../interfaces/common/order.type';

export class PagingOptions implements IPagingOptions {
  @IsOptional()
  @IsInt({ message: ConstraintMessagesConstants.MustBeInteger })
  readonly page?: number;

  @IsOptional()
  @IsInt({ message: ConstraintMessagesConstants.MustBeInteger })
  readonly pageSize?: number;

  @IsOptional()
  @IsEnum(Order, {
    message: 'invaluable value of order',
    context: {
      availableValues: Object.values(Order),
    },
  })
  order?: OrderType;
}
