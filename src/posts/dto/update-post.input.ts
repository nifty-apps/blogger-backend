import { InputType, OmitType, PartialType } from '@nestjs/graphql';
import { Post } from '../schemas/post.schema';

@InputType()
export class UpdatePostInput extends PartialType(
  OmitType(Post, ['createdAt'], InputType),
) {}
