import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { User } from '../user/entities/user.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async create(dto: CreatePostDto, author: User) {
    const post = this.postRepository.create({
      slug: 'asdjnsaljnvdskçjn' + Math.random().toString(36),
      title: dto.title,
      excerpt: dto.excerpt,
      content: dto.content,
      author,
    });

    const created = await this.postRepository.save(post);

    return created;
  }
}
