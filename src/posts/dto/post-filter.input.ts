import { Field, InputType } from '@nestjs/graphql';
import { PostTag } from '../schemas/post.schema';

@InputType()
class StringFilter {
  @Field(() => String, { nullable: true })
  eq: string;

  @Field(() => String, { nullable: true })
  contains: string;

  @Field(() => [String], { nullable: true })
  in: string[];
}

@InputType()
class PostTagFilter {
  @Field(() => [PostTag], { nullable: true })
  in: PostTag[];
}

@InputType()
class DateFilter {
  @Field(() => Date, { nullable: true })
  gte: Date;

  @Field(() => Date, { nullable: true })
  lte: Date;
}

@InputType()
export class PostFilterInput {
  @Field(() => [PostFilterInput], { nullable: true })
  and: [PostFilterInput];

  @Field(() => [PostFilterInput], { nullable: true })
  or: [PostFilterInput];

  @Field(() => StringFilter, { nullable: true })
  title: StringFilter;

  @Field(() => StringFilter, { nullable: true })
  content: StringFilter;

  @Field(() => StringFilter, { nullable: true })
  author?: StringFilter;

  @Field(() => PostTagFilter, { nullable: true })
  tags: PostTagFilter;

  @Field(() => DateFilter, { nullable: true })
  createdAt: DateFilter;
}
