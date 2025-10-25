import { Controller, Post, Delete, Get, Param, Query, Request } from '@nestjs/common';
import { ArticleLikeService } from '../services/article-like.service';
import { CreateArticleLikeDto } from '../dto/create-article-like.dto';
import { ArticleLike } from '../entities/article-like.entity';

@Controller('article-likes')
export class ArticleLikeController {
  constructor(private readonly articleLikeService: ArticleLikeService) {}

  /**
   * 点赞文章
   * @param req 请求对象，包含用户信息
   * @param createArticleLikeDto 点赞数据
   */
  @Post()
  async likeArticle(@Request() req, @Param() createArticleLikeDto: CreateArticleLikeDto): Promise<{ success: boolean; message: string; data?: ArticleLike }> {
    const result = await this.articleLikeService.likeArticle(req.user, createArticleLikeDto);
    return {
      success: true,
      message: '点赞成功',
      data: result,
    };
  }

  /**
   * 取消点赞文章
   * @param req 请求对象，包含用户信息
   * @param articleId 文章ID
   */
  @Delete(':articleId')
  async unlikeArticle(@Request() req, @Param('articleId') articleId: string): Promise<{ success: boolean; message: string; data?: ArticleLike }> {
    const result = await this.articleLikeService.unlikeArticle(req.user, articleId);
    return {
      success: true,
      message: '取消点赞成功',
      data: result,
    };
  }

  /**
   * 检查用户是否已点赞文章
   * @param req 请求对象，包含用户信息
   * @param articleId 文章ID
   */
  @Get(':articleId/check')
  async checkLikeStatus(@Request() req, @Param('articleId') articleId: string): Promise<{ success: boolean; isLiked: boolean }> {
    const isLiked = await this.articleLikeService.checkUserLikeStatus(req.user.id, articleId);
    return {
      success: true,
      isLiked,
    };
  }

  /**
   * 获取文章的点赞记录列表
   * @param articleId 文章ID
   * @param page 页码
   * @param limit 每页数量
   */
  @Get(':articleId/list')
  async getArticleLikes(@Param('articleId') articleId: string, @Query('page') page: number = 1, @Query('limit') limit: number = 20): Promise<{ success: boolean; data: ArticleLike[] }> {
    const skip = (page - 1) * limit;
    const data = await this.articleLikeService.getArticleLikes(articleId, skip, limit);
    return {
      success: true,
      data,
    };
  }

  /**
   * 获取当前用户点赞的文章列表
   * @param req 请求对象，包含用户信息
   * @param page 页码
   * @param limit 每页数量
   */
  @Get('user/liked')
  async getUserLikedArticles(@Request() req, @Query('page') page: number = 1, @Query('limit') limit: number = 20): Promise<{ success: boolean; data: ArticleLike[] }> {
    const skip = (page - 1) * limit;
    const data = await this.articleLikeService.getUserLikedArticles(req.user.id, skip, limit);
    return {
      success: true,
      data,
    };
  }
}
