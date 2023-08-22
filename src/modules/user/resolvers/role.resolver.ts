import { Query, Resolver } from '@nestjs/graphql';

import { Role } from '../entities/Role';
import { RoleService } from '../services/role.service';
@Resolver(() => Role)
export class RoleResolver {
  constructor(private readonly roleService: RoleService) {}

  @Query(() => [Role], {
    name: 'Role',
  })
  async findMany() {
    return this.roleService.findMany();
  }
}
