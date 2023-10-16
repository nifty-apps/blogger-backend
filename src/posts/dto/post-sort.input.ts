import { Field, InputType, registerEnumType } from '@nestjs/graphql';

enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

registerEnumType(SortOrder, {
  name: 'SortOrder',
  description: 'Sort order for the post',
});

@InputType()
export class PostSortInput {
  @Field(() => SortOrder, { nullable: true })
  title: SortOrder;

  @Field(() => SortOrder, { nullable: true })
  createdAt: SortOrder;
}
