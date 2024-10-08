import { Module } from '@nestjs/common';
import { GraphQLModule as GQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { PrismaService } from 'service/prisma';
import { ActionService } from 'service/action';
import { ActionResolver } from 'resolver/action';
import { GeolocationModule } from 'module/geolocation';
import { MoonPhaseModule } from 'module/moon-phase';
import { AuthModule } from 'module/auth';
import { UserModule } from 'module/user';
import { SessionModule } from 'module/session';
import { AirPollutionModule } from 'module/air-pollution';
import { LunarEclipseModule } from 'module/lunar-eclipse';
import { SolarEclipseModule } from 'module/solar-eclipse';

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
    AirPollutionModule,
    LunarEclipseModule,
    SolarEclipseModule,
  ],
  providers: [PrismaService, ActionResolver, ActionService],
})
export class GraphQLModule {}
