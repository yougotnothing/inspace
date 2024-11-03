import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from 'module/graphql';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      expandVariables: true,
    }),
    GraphQLModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
