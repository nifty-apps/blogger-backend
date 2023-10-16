import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { Post, PostDocument } from './schemas/post.schema';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<PostDocument>,
  ) {}

  create(createPostInput: CreatePostInput) {
    return this.postModel.create(createPostInput);
  }

  findAll() {
    return this.postModel.find();
  }

  findOne(id: Types.ObjectId) {
    return this.postModel.findById(id);
  }

  async update(id: Types.ObjectId, updatePostInput: UpdatePostInput) {
    const post = await this.postModel.findByIdAndUpdate(id, updatePostInput, {
      new: true,
    });

    if (!post) throw new BadRequestException('Post not found');
    return post;
  }

  async remove(id: Types.ObjectId) {
    const post = await this.postModel.findByIdAndDelete(id);

    if (!post) throw new BadRequestException('Post not found');
    return post;
  }
}
