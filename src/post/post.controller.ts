import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import type { AuthenticatedRequest } from '../auth/types/autheticated-request';
import { CreatePostDto } from './dto/create-post.dto';
import { PostResponseDto } from './dto/post-response.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(JwtAuthGuard)
  @Post('me')
  async create(@Req() req: AuthenticatedRequest, @Body() dto: CreatePostDto) {
    const post = await this.postService.create(dto, req.user);
    return new PostResponseDto(post);
  }
}
