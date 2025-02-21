import { SetMetadata, applyDecorators } from '@nestjs/common';

export const Roles = (roles, options = {}) =>
  applyDecorators(
    SetMetadata('roles', roles),
    SetMetadata('roles-options', options),
  );
