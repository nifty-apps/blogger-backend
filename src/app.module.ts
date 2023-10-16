import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    MongooseModule.forRoot(
      'mongodb+srv://intern:SheRmdE8kwTCXfTQ@niftydb.6dub1.mongodb.net/blogger',
    ),
    PostsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
