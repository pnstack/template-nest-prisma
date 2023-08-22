import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
class DeleteUserArgs {
  @Field(() => Int, { nullable: false })
  id: number;
}
export { DeleteUserArgs };
