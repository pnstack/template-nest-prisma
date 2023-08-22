import { Field, Float, InputType, Int } from '@nestjs/graphql';

@InputType()
export class Input {
  @Field(() => String)
  id: string;
}
