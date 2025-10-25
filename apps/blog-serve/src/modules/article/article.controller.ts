import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

/**
 * 文章控制器
 * 负责处理文章相关的HTTP请求
 */
@ApiTags('文章管理') // 为控制器添加标签
@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  /**
   * 创建新文章
   * @param createArticleDto 文章创建数据传输对象
   * @returns 创建成功的文章对象
   */
  @ApiOperation({
    summary: '创建新文章',
    description: '根据提供的文章信息创建一篇新文章',
  })
  @ApiBody({
    type: CreateArticleDto,
    description: '文章创建所需的数据',
    examples: {
      example1: {
        summary: '创建新文章',
        value: {
          title: '新文章标题',
          content: '这是一篇新文章的内容',
          authorId: '123e4567-e89b-12d3-a456-426614174000',
        },
      },
      example2: {
        summary: '创建草稿文章',
        value: {
          title: '草稿文章标题',
          content: '这是一篇草稿文章的内容',
          authorId: '123e4567-e89b-12d3-a456-426614174000',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: '文章创建成功',
    content: {
      'application/json': {
        example: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          title: '新文章标题',
          content: '这是一篇新文章的内容',
          isPublished: true,
          createdAt: '2025-10-19T12:00:00Z',
          updatedAt: '2025-10-19T12:00:00Z',
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: '请求参数错误',
  })
  @Post()
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articleService.create(createArticleDto);
  }

  /**
   * 获取所有文章列表
   * @returns 文章列表数组
   */
  @ApiOperation({
    summary: '获取文章列表',
    description: '获取所有已发布的文章列表',
  })
  @ApiResponse({
    status: 200,
    description: '成功获取文章列表',
  })
  @Get()
  findAll() {
    return this.articleService.findAll();
  }

  /**
   * 根据ID获取文章详情
   * @param id 文章ID
   * @returns 文章详情对象
   */
  @ApiOperation({
    summary: '获取文章详情',
    description: '根据文章ID获取指定文章的详细信息',
  })
  @ApiParam({
    name: 'id',
    description: '文章ID',
    type: String,
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: '成功获取文章详情',
  })
  @ApiResponse({
    status: 404,
    description: '文章不存在',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articleService.findOne(id);
  }

  /**
   * 更新文章信息
   * @param id 文章ID
   * @param updateArticleDto 文章更新数据传输对象
   * @returns 更新后的文章对象
   */
  @ApiOperation({
    summary: '更新文章',
    description: '根据文章ID更新指定文章的信息',
  })
  @ApiParam({
    name: 'id',
    description: '文章ID',
    type: String,
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiBody({
    type: UpdateArticleDto,
    description: '文章更新所需的数据',
  })
  @ApiResponse({
    status: 200,
    description: '文章更新成功',
  })
  @ApiResponse({
    status: 400,
    description: '请求参数错误',
  })
  @ApiResponse({
    status: 404,
    description: '文章不存在',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articleService.update(id, updateArticleDto);
  }

  /**
   * 删除文章
   * @param id 文章ID
   * @returns 删除结果
   */
  @ApiOperation({
    summary: '删除文章',
    description: '根据文章ID删除指定文章',
  })
  @ApiParam({
    name: 'id',
    description: '文章ID',
    type: String,
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: '文章删除成功',
  })
  @ApiResponse({
    status: 404,
    description: '文章不存在',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articleService.remove(id);
  }
}
