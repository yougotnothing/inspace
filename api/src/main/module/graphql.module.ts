import { Module } from '@nestjs/common';
import { GraphQLModule as GQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { UserService } from 'service/user';
import { PrismaService } from 'service/prisma';
import { SessionService } from 'service/session';
import { AuthService } from 'service/auth';
import { SessionResolver } from 'resolver/session';
import { UserResolver } from 'resolver/user';
import { AuthResolver } from 'resolver/auth';
import { ActionResolver } from 'resolver/action';
import { ActionService } from 'service/action';

@Module({
  imports: [
    GQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      sortSchema: true,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/main/schema.gql'),
    }),
  ],
  providers: [
    UserResolver,
    UserService,
    PrismaService,
    SessionResolver,
    SessionService,
    AuthResolver,
    AuthService,
    ActionResolver,
    ActionService,
  ],
})
export class GraphQLModule {}
