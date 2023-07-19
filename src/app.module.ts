import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { RegisterModule } from './user/register/register.module';
import { LoginModule } from './user/login/login.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
    }),
    RegisterModule,
    LoginModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
