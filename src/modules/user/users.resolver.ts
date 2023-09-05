import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { UserFindByPkArgs } from './dtos/args/UserFindByPkArgs';
import { UserFindManyArgs } from './dtos/args/UserFindManyArgs';
import { CreateUserArgs } from './dtos/args/create-user.args';
import { UpdateUserArgs } from './dtos/args/update-user.args';
import { UserAggregateArgs } from './dtos/args/user-aggregate.args';
import { User } from './entities/User';
import { UserRole } from './entities/UserRole';
import { UserAggregate } from './entities/user-aggregate.entity';
import { UsersService } from './users.service';


@Resolver(() => User)
export class UserResolver {
  constructor(protected readonly userService: UsersService) {}


  @Query(() => UserAggregate, {
    name: 'User_aggregate',
  })
  async aggregate(@Args() args: UserAggregateArgs) {
    console.log(args);
    const result = await this.userService.aggregate({
      ...args,
      _count: true,
    });
    return result;
  }


  @Mutation(() => User)
  async createUser(@Args() args: CreateUserArgs) {
    const roles = args.data.roles;
    delete args.data.roles;

    const result = await this.userService.createUser(args, roles);
    return result;
  }

  @Mutation(() => User)
  async updateUser(@Args() args: UpdateUserArgs) {
    // TODO: passowrd protection
    const roles = args.data.roles;
    delete args.data.roles;
    return this.userService.updateUser(args, roles);
  }

  @Mutation(() => User)
  async deleteUser(@Args('id', { type: () => Int }) id: number) {
    return this.userService.deleteUser({
      where: {
        id: Number(id),
      },
    });
  }

  // resolve fields

  @ResolveField(() => [UserRole], { nullable: true })
  async userRole(@Parent() parent: User): Promise<UserRole[]> {
    const result = await this.userService.getUserRole(parent.id);
    console.log(result);

    if (!result) {
      return [];
    }
    return result;
  }

  @ResolveField(() => [String], { nullable: true, name: 'roles' })
  async getRoles(@Parent() parent: User) {
    const result = await this.userService.getUserRole(parent.id);
    return result.map((role) => role.roleName);
  }
}
