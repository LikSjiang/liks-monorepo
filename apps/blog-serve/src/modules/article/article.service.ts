import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Repository } from 'typeorm';
import { Article } from './entities/article.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from '../user/user.service';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
    private readonly userService: UserService,
  ) {}

  async create(createArticleDto: CreateArticleDto): Promise<null> {
    const authId = createArticleDto.authorId;
    const user = await this.userService.findOne(authId);
    if (!user) {
      throw new HttpException('作者不存在', HttpStatus.BAD_REQUEST);
    }
    await this.articleRepository.save(createArticleDto);
    return null;
  }

  async findAll(page: number = 1, size: number = 10): Promise<Global.ListRecord<Article>> {
    const [list, total] = await this.articleRepository.findAndCount({
      skip: (page - 1) * size,
      take: size,
    });
    const pages = Math.ceil(total / size);
    const isEnd = [page, 0].includes(pages);
    return {
      list,
      size,
      page,
      total,
      pages,
      isEnd,
    };
  }

  async findOne(id: string): Promise<Article | null> {
    return await this.articleRepository.findOne({ where: { id } });
  }

  async findList(): Promise<Article[]> {
    return await this.articleRepository.find();
  }

  async update(id: string, updateArticleDto: UpdateArticleDto): Promise<null> {
    const info = await this.findOne(id);
    if (!info) {
      throw new HttpException('文章不存在', HttpStatus.BAD_REQUEST);
    }
    const authId = updateArticleDto.authorId || info.authorId;
    const user = await this.userService.findOne(authId);
    if (!user) {
      throw new HttpException('作者不存在', HttpStatus.BAD_REQUEST);
    }
    const updateInfo = {
      ...info,
      ...updateArticleDto,
    };
    await this.articleRepository.update(id, updateInfo);
    return null;
  }

  async remove(id: string): Promise<null> {
    const info = await this.findOne(id);
    if (!info) {
      throw new HttpException('文章不存在', HttpStatus.BAD_REQUEST);
    }
    await this.articleRepository.delete(id);
    return null;
  }
}
