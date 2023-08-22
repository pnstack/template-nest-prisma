import { ArgsType, Field } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { UserWhereInput } from '../inputs/UserWhereInput';
@ArgsType()
class UserAggregateArgs {
  @Field(() => UserWhereInput, { nullable: true })
  where?: UserWhereInput;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @Field(() => Number, { nullable: true })
  @Type(() => Number)
  skip?: number;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @Field(() => Number, { nullable: true })
  @Type(() => Number)
  take?: number;
}
export { UserAggregateArgs };
