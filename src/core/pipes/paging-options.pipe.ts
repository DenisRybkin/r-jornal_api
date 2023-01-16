import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { IPagingOptions, OrderType } from '../interfaces/common';
import { PagingConstants } from '../constants/paging.constants';
import { Order } from '../interfaces/common/order.type';
import { TransformPagingType } from './types/transformPaging.type';

export class PagingOptionsPipe implements PipeTransform {
  async transform(
    value: IPagingOptions,
    metadata: ArgumentMetadata,
  ): Promise<TransformPagingType> {
    const { page, pageSize, order, ...other } = value;

    const transformPage = PagingOptionsPipe.transformInt(
      page as unknown as string,
      PagingConstants.Page,
    );
    const transformPageSize = PagingOptionsPipe.transformInt(
      pageSize as unknown as string,
      PagingConstants.PageSize,
    );
    const transformOrder = PagingOptionsPipe.transformOrder(
      order as OrderType,
      Order.asc,
    );

    return {
      pagingOptions: {
        page: transformPage,
        pageSize: transformPageSize,
        order: transformOrder,
      },
      other,
    };
  }

  private static transformInt(
    transformValue: string,
    defaultValue: number,
  ): number {
    return transformValue
      ? Number.isNaN(parseInt(transformValue, 10))
        ? defaultValue
        : parseInt(transformValue as unknown as string, 10)
      : defaultValue;
  }

  private static transformOrder(
    transformValue: OrderType,
    defaultValue: OrderType,
  ): OrderType {
    return transformValue
      ? Object.values(Order).includes(transformValue)
        ? transformValue
        : defaultValue
      : defaultValue;
  }
}
