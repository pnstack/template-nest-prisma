import { Module } from '@nestjs/common';

import { PasswordService } from '@/modules/auth/password.service';

import { UserResolver } from './resolvers/users.resolver';
import { UsersService } from './services/users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [],
  providers: [UsersService, PasswordService, UserResolver],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
