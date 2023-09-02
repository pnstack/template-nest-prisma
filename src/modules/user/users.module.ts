import { Module } from '@nestjs/common';

import { PasswordService } from '@/modules/auth/password.service';

import { RoleResolver } from './resolvers/role.resolver';
import { UserResolver } from './resolvers/users.resolver';
import { RoleService } from './services/role.service';
import { UsersService } from './services/users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [],
  providers: [UsersService, PasswordService, UserResolver, RoleResolver, RoleService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
