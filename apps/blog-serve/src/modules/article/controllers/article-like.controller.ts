import { Controller, Post, Delete, Get, Param, Query, Request, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ArticleLikeService } from '../services/article-like.service';
import { CreateArticleLikeDto } from '../dto/create-article-like.dto';
import { ArticleLike } from '../entities/article-like.entity';
import { JwtPayload } from 'jsonwebtoken';

/**
 * 文章点赞控制器
 * 处理文章点赞相关的API请求
 */
@ApiTags('文章点赞')
@ApiBearerAuth() // 需要认证
@Controller('article-likes')
export class ArticleLikeController {
  constructor(private readonly articleLikeService: ArticleLikeService) {}

  /**
   * 点赞文章
   * @param req 请求对象，包含用户信息
   * @param createArticleLikeDto 点赞数据
   */
  @ApiOperation({
    summary: '点赞文章',
    description: '用户对指定文章进行点赞操作，成功后文章点赞数+1',
  })
  @ApiResponse({
    status: 200,
    description: '点赞成功',
    schema: {
      example: {
        success: true,
        message: '点赞成功',
        data: {
          id: 'uuid',
          userId: 'uuid',
          articleId: 'uuid',
          isLiked: 1,
          createdAt: '2023-10-01T00:00:00.000Z',
          updatedAt: '2023-10-01T00:00:00.000Z',
        },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: '文章不存在',
    schema: {
      example: {
        statusCode: 404,
        message: '文章不存在',
      },
    },
  })
  @ApiResponse({
    status: 409,
    description: '您已经点赞过这篇文章',
    schema: {
      example: {
        statusCode: 409,
        message: '您已经点赞过这篇文章',
      },
    },
  })
  @Post()
  async likeArticle(@Request() req, @Body() createArticleLikeDto: CreateArticleLikeDto): Promise<{ success: boolean; message: string; data?: ArticleLike }> {
    const userPayload = req['user'] as JwtPayload;
    const result = await this.articleLikeService.likeArticle(userPayload.sub as string, createArticleLikeDto);
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
  @ApiOperation({
    summary: '取消点赞文章',
    description: '用户取消对指定文章的点赞，成功后文章点赞数-1',
  })
  @ApiParam({
    name: 'articleId',
    description: '文章ID',
    required: true,
    example: 'uuid',
  })
  @ApiResponse({
    status: 200,
    description: '取消点赞成功',
    schema: {
      example: {
        success: true,
        message: '取消点赞成功',
        data: {
          id: 'uuid',
          userId: 'uuid',
          articleId: 'uuid',
          isLiked: 0,
          createdAt: '2023-10-01T00:00:00.000Z',
          updatedAt: '2023-10-02T00:00:00.000Z',
        },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: '文章不存在或您还没有点赞过这篇文章',
    schema: {
      example: {
        statusCode: 404,
        message: '您还没有点赞过这篇文章',
      },
    },
  })
  @Delete(':articleId')
  async unlikeArticle(@Request() req, @Param('articleId') articleId: string): Promise<{ success: boolean; message: string; data?: ArticleLike }> {
    const userPayload = req['user'] as JwtPayload;
    const result = await this.articleLikeService.unlikeArticle(userPayload.sub as string, articleId);
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
  @ApiOperation({
    summary: '检查用户是否已点赞文章',
    description: '查询当前登录用户是否已点赞指定文章',
  })
  @ApiParam({
    name: 'articleId',
    description: '文章ID',
    required: true,
    example: 'uuid',
  })
  @ApiResponse({
    status: 200,
    description: '查询成功',
    schema: {
      example: {
        success: true,
        isLiked: true,
      },
    },
  })
  @Get(':articleId/check')
  async checkLikeStatus(@Request() req, @Param('articleId') articleId: string): Promise<{ success: boolean; isLiked: boolean }> {
    const userPayload = req['user'] as JwtPayload;
    const isLiked = await this.articleLikeService.checkUserLikeStatus(userPayload.sub as string, articleId);
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
  @ApiOperation({
    summary: '获取文章的点赞记录列表',
    description: '查询指定文章的所有点赞记录，包括点赞用户信息',
  })
  @ApiParam({
    name: 'articleId',
    description: '文章ID',
    required: true,
    example: 'uuid',
  })
  @ApiQuery({
    name: 'page',
    description: '页码，默认1',
    required: false,
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    description: '每页数量，默认20',
    required: false,
    example: 20,
  })
  @ApiResponse({
    status: 200,
    description: '查询成功',
    schema: {
      example: {
        success: true,
        data: [
          {
            id: 'uuid',
            userId: 'uuid',
            articleId: 'uuid',
            isLiked: 1,
            user: {
              id: 'uuid',
              username: 'user1',
              nickname: '昵称',
              avatar: '头像URL',
            },
            createdAt: '2023-10-01T00:00:00.000Z',
            updatedAt: '2023-10-01T00:00:00.000Z',
          },
        ],
      },
    },
  })
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
  @ApiOperation({
    summary: '获取当前用户点赞的文章列表',
    description: '查询当前登录用户所有点赞过的文章记录',
  })
  @ApiQuery({
    name: 'page',
    description: '页码，默认1',
    required: false,
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    description: '每页数量，默认20',
    required: false,
    example: 20,
  })
  @ApiResponse({
    status: 200,
    description: '查询成功',
    schema: {
      example: {
        success: true,
        data: [
          {
            id: 'uuid',
            userId: 'uuid',
            articleId: 'uuid',
            isLiked: 1,
            article: {
              id: 'uuid',
              title: '文章标题',
              cover: '封面URL',
              viewCount: 100,
              likeCount: 10,
              createdAt: '2023-10-01T00:00:00.000Z',
            },
            createdAt: '2023-10-01T00:00:00.000Z',
            updatedAt: '2023-10-01T00:00:00.000Z',
          },
        ],
      },
    },
  })
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
