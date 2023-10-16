import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export enum PostTag {
  TECHNOLOGY = 'TECHNOLOGY',
  SCIENCE = 'SCIENCE',
  SPORTS = 'SPORTS',
  ENTERTAINMENT = 'ENTERTAINMENT',
}

registerEnumType(PostTag, {
  name: 'PostTag',
  description: 'Category of the post',
});

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
  author: string;

  @Field(() => [PostTag])
  @Prop({ type: [String], enum: PostTag })
  tags: PostTag[];

  @Field()
  createdAt: Date;
}

export type PostDocument = HydratedDocument<Post>;
export const PostSchema = SchemaFactory.createForClass(Post);
