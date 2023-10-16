import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@ObjectType()
@Schema({ timestamps: true })
export class Post {
  @Field(() => ID)
  _id: Types.ObjectId;

  @Field()
  @Prop()
  title: string;

  @Field()
  @Prop()
  content: string;

  @Field()
  @Prop()
  category: string;

  @Field()
  @Prop()
  author: string;

  @Field()
  createdAt: Date;
}

export type PostDocument = HydratedDocument<Post>;
export const PostSchema = SchemaFactory.createForClass(Post);
