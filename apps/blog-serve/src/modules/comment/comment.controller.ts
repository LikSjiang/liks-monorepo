import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('评论管理')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @ApiOperation({ summary: '创建评论', description: '创建新的评论' })
  @ApiBody({ type: CreateCommentDto, description: '评论创建信息' })
  @ApiResponse({ status: 201, description: '评论创建成功' })
  @ApiResponse({ status: 400, description: '请求参数错误' })
  @ApiResponse({ status: 500, description: '服务器内部错误' })
  @Post()
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.create(createCommentDto);
  }

  @ApiOperation({ summary: '获取所有评论', description: '获取系统中所有评论的列表' })
  @ApiResponse({ status: 200, description: '获取评论列表成功' })
  @ApiResponse({ status: 500, description: '服务器内部错误' })
  @Get()
  findAll() {
    return this.commentService.findAll();
  }

  @ApiOperation({ summary: '获取单个评论', description: '根据评论ID获取评论详情' })
  @ApiParam({ name: 'id', description: '评论ID', required: true })
  @ApiResponse({ status: 200, description: '获取评论详情成功' })
  @ApiResponse({ status: 404, description: '评论不存在' })
  @ApiResponse({ status: 500, description: '服务器内部错误' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentService.findOne(id);
  }

  @ApiOperation({ summary: '更新评论', description: '根据评论ID更新评论信息' })
  @ApiParam({ name: 'id', description: '评论ID', required: true })
  @ApiBody({ type: UpdateCommentDto, description: '评论更新信息' })
  @ApiResponse({ status: 200, description: '评论更新成功' })
  @ApiResponse({ status: 400, description: '请求参数错误' })
  @ApiResponse({ status: 404, description: '评论不存在' })
  @ApiResponse({ status: 500, description: '服务器内部错误' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.update(id, updateCommentDto);
  }

  @ApiOperation({ summary: '删除评论', description: '根据评论ID删除评论' })
  @ApiParam({ name: 'id', description: '评论ID', required: true })
  @ApiResponse({ status: 200, description: '评论删除成功' })
  @ApiResponse({ status: 404, description: '评论不存在' })
  @ApiResponse({ status: 500, description: '服务器内部错误' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentService.remove(id);
  }
}
