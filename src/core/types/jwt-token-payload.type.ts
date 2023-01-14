import { RolesType } from '../interfaces/common';

export type JwtTokenPayloadType = {
  id: number;
  email: string;
  roleId: number;
  roleName: RolesType;
};
