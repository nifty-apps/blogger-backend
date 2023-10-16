import { InputType, OmitType } from '@nestjs/graphql';
import { Post } from '../schemas/post.schema';

@InputType()
export class CreatePostInput extends OmitType(
  Post,
  ['_id', 'createdAt'],
  InputType,
) {}
