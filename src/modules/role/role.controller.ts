import { Controller, Get, Query } from '@nestjs/common';
import { RoleService } from './role.service';
import { PagingOptionsPipe } from '../../core/pipes';
import { IPagingOptions } from '../../core/interfaces/common';
import { TransformPagingType } from '../../core/pipes/types/transformPaging.type';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  getAll(@Query(PagingOptionsPipe) query: TransformPagingType) {
    return this.roleService.getAll(query.pagingOptions);
  }

  @Get('autocomplete')
  autocomplete(@Query(PagingOptionsPipe) query: TransformPagingType) {
    return this.roleService.autocomplete(query.pagingOptions);
  }
}
