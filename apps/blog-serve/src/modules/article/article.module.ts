import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { ArticleLikeService } from './services/article-like.service';
import { ArticleLikeController } from './controllers/article-like.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { ArticleLike } from './entities/article-like.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Article, ArticleLike]), UserModule],
  controllers: [ArticleController, ArticleLikeController],
  providers: [ArticleService, ArticleLikeService],
})
export class ArticleModule {}
