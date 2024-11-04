import { Module } from '@nestjs/common';
import { GraphQLModule as GQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginCacheControl } from '@apollo/server/plugin/cacheControl';
import { join } from 'path';
import { PrismaService } from 'service/prisma';
import { ActionService } from 'service/action';
import { ActionResolver } from 'resolver/action';
import { GeolocationModule } from 'module/geolocation';
import { MoonPhaseModule } from 'module/moon-phase';
import { AuthModule } from 'module/auth';
import { UserModule } from 'module/user';
import { AirPollutionModule } from 'module/air-pollution';
import { LunarEclipseModule } from 'module/lunar-eclipse';
import { SolarEclipseModule } from 'module/solar-eclipse';
import { LunarApsisModule } from 'module/lunar-apsis';
import { UserAvatarModule } from 'module/user-avatar';
import { EmailModule } from './email.module';
import { NearestBodiesModule } from './nearest-bodies.module';

@Module({
  imports: [
    GQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      plugins: [ApolloServerPluginCacheControl({ defaultMaxAge: 30 })],
      sortSchema: true,
      playground: {
        settings: {
          'request.credentials': 'include',
        },
      },
      context: ({ req, res }) => ({ req, res }),
      autoSchemaFile: join(process.cwd(), 'src/main/schema.gql'),
    }),
    GeolocationModule,
    MoonPhaseModule,
    AuthModule,
    UserModule,
    AirPollutionModule,
    LunarEclipseModule,
    SolarEclipseModule,
    LunarApsisModule,
    UserAvatarModule,
    EmailModule,
    NearestBodiesModule,
  ],
  providers: [PrismaService, ActionResolver, ActionService],
})
export class GraphQLModule {}
