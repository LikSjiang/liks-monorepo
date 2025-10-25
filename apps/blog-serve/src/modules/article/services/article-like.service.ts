import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArticleLike } from '../entities/article-like.entity';
import { Article } from '../entities/article.entity';
import { User } from '../../user/entities/user.entity';
import { CreateArticleLikeDto } from '../dto/create-article-like.dto';

@Injectable()
export class ArticleLikeService {
  constructor(
    @InjectRepository(ArticleLike) private articleLikeRepository: Repository<ArticleLike>,
    @InjectRepository(Article) private articleRepository: Repository<Article>,
  ) {}

  /**
   * 用户点赞文章
   */
  async likeArticle(user: User, createArticleLikeDto: CreateArticleLikeDto): Promise<ArticleLike> {
    const { articleId } = createArticleLikeDto;

    // 检查文章是否存在
    const article = await this.articleRepository.findOne({ where: { id: articleId } });
    if (!article) {
      throw new NotFoundException('文章不存在');
    }

    // 检查是否已经点赞
    const existingLike = await this.articleLikeRepository.findOne({
      where: {
        userId: user.id,
        articleId,
        isLiked: 1,
      },
    });

    if (existingLike) {
      throw new ConflictException('您已经点赞过这篇文章');
    }

    // 尝试查找已取消点赞的记录
    let likeRecord = await this.articleLikeRepository.findOne({
      where: {
        userId: user.id,
        articleId,
      },
    });

    // 开始事务处理
    const queryRunner = this.articleLikeRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      if (likeRecord) {
        // 如果存在记录，更新状态为点赞
        likeRecord.isLiked = 1;
        likeRecord.updatedAt = new Date();
        likeRecord = await queryRunner.manager.save(likeRecord);
      } else {
        // 创建新的点赞记录
        likeRecord = this.articleLikeRepository.create({
          userId: user.id,
          articleId,
          user,
          article,
          isLiked: 1,
        });
        likeRecord = await queryRunner.manager.save(likeRecord);
      }

      // 更新文章的点赞数
      article.likeCount += 1;
      await queryRunner.manager.save(article);

      await queryRunner.commitTransaction();
      return likeRecord;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  /**
   * 用户取消点赞文章
   */
  async unlikeArticle(user: User, articleId: string): Promise<ArticleLike> {
    // 检查文章是否存在
    const article = await this.articleRepository.findOne({ where: { id: articleId } });
    if (!article) {
      throw new NotFoundException('文章不存在');
    }

    // 查找点赞记录
    const likeRecord = await this.articleLikeRepository.findOne({
      where: {
        userId: user.id,
        articleId,
        isLiked: 1,
      },
    });

    if (!likeRecord) {
      throw new NotFoundException('您还没有点赞过这篇文章');
    }

    // 开始事务处理
    const queryRunner = this.articleLikeRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // 更新点赞记录状态为已取消
      likeRecord.isLiked = 0;
      likeRecord.updatedAt = new Date();
      await queryRunner.manager.save(likeRecord);

      // 更新文章的点赞数
      if (article.likeCount > 0) {
        article.likeCount -= 1;
      }
      await queryRunner.manager.save(article);

      await queryRunner.commitTransaction();
      return likeRecord;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  /**
   * 检查用户是否已点赞文章
   */
  async checkUserLikeStatus(userId: string, articleId: string): Promise<boolean> {
    const likeRecord = await this.articleLikeRepository.findOne({
      where: {
        userId,
        articleId,
        isLiked: 1,
      },
    });
    return !!likeRecord;
  }

  /**
   * 获取文章的点赞记录列表
   */
  async getArticleLikes(articleId: string, skip: number = 0, take: number = 20): Promise<ArticleLike[]> {
    return this.articleLikeRepository.find({
      where: { articleId, isLiked: 1 },
      relations: ['user'],
      skip,
      take,
      order: { createdAt: 'DESC' },
    });
  }

  /**
   * 获取用户点赞的文章列表
   */
  async getUserLikedArticles(userId: string, skip: number = 0, take: number = 20): Promise<ArticleLike[]> {
    return this.articleLikeRepository.find({
      where: { userId, isLiked: 1 },
      relations: ['article'],
      skip,
      take,
      order: { createdAt: 'DESC' },
    });
  }
}
