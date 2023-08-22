import { ArgsType } from '@nestjs/graphql';
import { CreateBaseArgs } from '@modules/common/dtos/args/CreateBaseArgs';

import { CreateUserInput } from '../inputs/create-user.input';

@ArgsType()
class CreateUserArgs extends CreateBaseArgs(CreateUserInput) {}

export { CreateUserArgs };
