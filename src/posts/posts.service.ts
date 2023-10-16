import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreatePostInput } from './dto/create-post.input';
import { PostFilterInput } from './dto/post-filter.input';
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

  handleFilter(filter: PostFilterInput) {
    const query = {};

    if (filter.and || filter.or) {
      if (filter.and) {
        query['$and'] = filter.and.map((subFilter) =>
          this.handleFilter(subFilter),
        );
      }
      if (filter.or) {
        query['$or'] = filter.or.map((subFilter) =>
          this.handleFilter(subFilter),
        );
      }
      return query;
    }

    if (filter.title) {
      if (filter.title.eq) {
        query['title'] = filter.title.eq;
      }
      if (filter.title.contains) {
        query['title'] = { $regex: filter.title.contains, $options: 'i' };
      }
      if (filter.title.in) {
        query['title'] = { $in: filter.title.in };
      }
    }
    if (filter.content) {
      if (filter.content.eq) {
        query['content'] = filter.content.eq;
      }
      if (filter.content.contains) {
        query['content'] = { $regex: filter.content.contains, $options: 'i' };
      }
      if (filter.content.in) {
        query['content'] = { $in: filter.content.in };
      }
    }
    if (filter.author) {
      if (filter.author.eq) {
        query['author'] = filter.author.eq;
      }
      if (filter.author.contains) {
        query['author'] = { $regex: filter.author.contains, $options: 'i' };
      }
      if (filter.author.in) {
        query['author'] = { $in: filter.author.in };
      }
    }
    if (filter.tags) {
      if (filter.tags.in) {
        query['tags'] = { $in: filter.tags.in };
      }
    }
    if (filter.createdAt) {
      if (filter.createdAt.gte) {
        query['createdAt'] = { $gte: filter.createdAt.gte };
      }
      if (filter.createdAt.lte) {
        query['createdAt'] = { $lte: filter.createdAt.lte };
      }
    }

    return query;
  }

  findAll(filter?: PostFilterInput) {
    const query = filter ? this.handleFilter(filter) : {};
    return this.postModel.find(query);
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
