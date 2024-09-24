import { Module } from '@nestjs/common';
import { GraphQLModule as GQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { PrismaService } from 'service/prisma';
import { ActionResolver } from 'resolver/action';
import { ActionService } from 'service/action';
import { GeolocationModule } from './geolocation.module';
import { MoonPhaseModule } from './moon-phase.module';
import { AuthModule } from './auth.module';
import { UserModule } from './user.module';
import { SessionModule } from './session.module';

@Module({
  imports: [
    GQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      sortSchema: true,
      playground: true,
      context: ({ req, res }) => ({ req, res }),
      autoSchemaFile: join(process.cwd(), 'src/main/schema.gql'),
    }),
    GeolocationModule,
    MoonPhaseModule,
    AuthModule,
    UserModule,
    SessionModule,
  ],
  providers: [PrismaService, ActionResolver, ActionService],
})
export class GraphQLModule {}
