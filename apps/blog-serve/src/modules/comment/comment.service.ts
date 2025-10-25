import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CommentService {
  constructor(@InjectRepository(Comment) private readonly commentRepository: Repository<Comment>) {}

  create(createCommentDto: CreateCommentDto) {
    return this.commentRepository.save(createCommentDto);
  }

  findAll() {
    return this.commentRepository.find();
  }

  findOne(id: string) {
    return this.commentRepository.findOne({ where: { id } });
  }

  update(id: string, updateCommentDto: UpdateCommentDto) {
    return this.commentRepository.update(id, updateCommentDto);
  }

  remove(id: string) {
    return this.commentRepository.delete(id);
  }
}
