import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Types } from 'mongoose';
import { CreatePostInput } from './dto/create-post.input';
import { PostFilterInput } from './dto/post-filter.input';
import { UpdatePostInput } from './dto/update-post.input';
import { PostsService } from './posts.service';
import { Post } from './schemas/post.schema';

@Resolver(() => Post)
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @Mutation(() => Post)
  createPost(@Args('createPostInput') createPostInput: CreatePostInput) {
    return this.postsService.create(createPostInput);
  }

  @Query(() => [Post], { name: 'posts' })
  findAll(@Args('filter', { nullable: true }) filter?: PostFilterInput) {
    return this.postsService.findAll(filter);
  }

  @Query(() => Post, { name: 'post' })
  findOne(@Args('id', { type: () => ID }) id: Types.ObjectId) {
    return this.postsService.findOne(id);
  }

  @Mutation(() => Post)
  updatePost(@Args('updatePostInput') updatePostInput: UpdatePostInput) {
    return this.postsService.update(updatePostInput._id, updatePostInput);
  }

  @Mutation(() => Post)
  removePost(@Args('id', { type: () => ID }) id: Types.ObjectId) {
    return this.postsService.remove(id);
  }
}
