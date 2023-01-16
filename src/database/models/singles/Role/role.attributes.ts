import { RolesType } from '../../../../core/interfaces/common';

export interface CreateRoleAttributes {
  readonly name: RolesType;
  readonly description?: string;
}
