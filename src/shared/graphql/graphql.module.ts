import { Global, Module } from '@nestjs/common';

import { PubSubService } from './pubsub.service';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { GraphQLModule as NestGraphQLModule } from '@nestjs/graphql';
import { GqlConfigService } from './gql-config.service';
import { PubSubModule } from './pubsub.module';

@Global()
@Module({
  imports: [
    NestGraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useClass: GqlConfigService,
    }),
    PubSubModule,
  ],
  providers: [PubSubService],
  exports: [PubSubService],
})
export class GraphQLModule {}
