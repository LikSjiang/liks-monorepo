/*
 * @Description: 标签控制器
 * @Author: liks
 * @Date: 2025-10-23 16:55:52
 * @LastEditors: liks
 * @LastEditTime: 2025-10-23 17:00:00
 */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';

@ApiTags('标签管理')
@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @ApiOperation({
    summary: '创建标签',
    description: '创建新的标签，名称为必填项，链接、关键词和描述为可选项',
  })
  @ApiBody({
    type: CreateTagDto,
    description: '标签创建信息',
    examples: {
      example1: {
        summary: '创建标签示例',
        value: {
          name: 'JavaScript',
          link: 'javascript',
          keywords: 'JavaScript,前端,编程语言',
          description: 'JavaScript编程语言相关标签',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: '标签创建成功',
    schema: {
      example: {
        id: '1',
        name: 'JavaScript',
        link: 'javascript',
        keywords: 'JavaScript,前端,编程语言',
        description: 'JavaScript编程语言相关标签',
        createdAt: '2025-10-23T16:55:52.000Z',
        updatedAt: '2025-10-23T16:55:52.000Z',
      },
    },
  })
  @ApiResponse({ status: 400, description: '参数错误或标签名称已存在' })
  @Post()
  create(@Body() createTagDto: CreateTagDto) {
    return this.tagService.create(createTagDto);
  }

  @ApiOperation({
    summary: '获取所有标签',
    description: '获取完整的标签列表，包含所有标签详细信息',
  })
  @ApiResponse({
    status: 200,
    description: '标签列表获取成功',
    schema: {
      example: [
        {
          id: '1',
          name: 'JavaScript',
          link: 'javascript',
          keywords: 'JavaScript,前端,编程语言',
          description: 'JavaScript编程语言相关标签',
          createdAt: '2025-10-23T16:55:52.000Z',
          updatedAt: '2025-10-23T16:55:52.000Z',
        },
        {
          id: '2',
          name: 'TypeScript',
          link: 'typescript',
          keywords: 'TypeScript,前端,编程语言',
          description: 'TypeScript编程语言相关标签',
          createdAt: '2025-10-23T16:56:52.000Z',
          updatedAt: '2025-10-23T16:56:52.000Z',
        },
      ],
    },
  })
  @Get()
  findAll() {
    return this.tagService.findAll();
  }

  @ApiOperation({
    summary: '获取标签列表（精简版）',
    description: '获取精简版标签列表，通常用于前端展示和选择',
  })
  @ApiResponse({
    status: 200,
    description: '精简标签列表获取成功',
    schema: {
      example: [
        {
          id: '1',
          name: 'JavaScript',
          link: 'javascript',
        },
        {
          id: '2',
          name: 'TypeScript',
          link: 'typescript',
        },
        {
          id: '3',
          name: 'Vue.js',
          link: 'vuejs',
        },
      ],
    },
  })
  @Get('list')
  findList() {
    return this.tagService.findList();
  }

  @ApiOperation({
    summary: '获取单个标签信息',
    description: '根据标签ID获取指定标签的详细信息',
  })
  @ApiParam({
    name: 'id',
    description: '标签ID',
    required: true,
    example: '1',
  })
  @ApiResponse({
    status: 200,
    description: '标签信息获取成功',
    schema: {
      example: {
        id: '1',
        name: 'JavaScript',
        link: 'javascript',
        keywords: 'JavaScript,前端,编程语言',
        description: 'JavaScript编程语言相关标签',
        createdAt: '2025-10-23T16:55:52.000Z',
        updatedAt: '2025-10-23T16:55:52.000Z',
      },
    },
  })
  @ApiResponse({ status: 404, description: '标签不存在' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tagService.findOne(id);
  }

  @ApiOperation({
    summary: '更新标签信息',
    description: '根据标签ID更新标签的相关信息，可选择性更新字段',
  })
  @ApiParam({
    name: 'id',
    description: '标签ID',
    required: true,
    example: '1',
  })
  @ApiResponse({
    status: 200,
    description: '标签更新成功',
    schema: {
      example: {
        id: '1',
        name: 'JavaScript高级',
        link: 'javascript-advanced',
        keywords: 'JavaScript,前端,高级,编程语言',
        description: 'JavaScript高级编程相关标签',
        createdAt: '2025-10-23T16:55:52.000Z',
        updatedAt: '2025-10-23T17:00:00.000Z',
      },
    },
  })
  @ApiResponse({ status: 404, description: '标签不存在' })
  @ApiResponse({ status: 400, description: '参数错误' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTagDto: UpdateTagDto) {
    return this.tagService.update(id, updateTagDto);
  }

  @ApiOperation({
    summary: '删除标签',
    description: '根据标签ID删除指定标签',
  })
  @ApiParam({
    name: 'id',
    description: '标签ID',
    required: true,
    example: '1',
  })
  @ApiResponse({ status: 200, description: '标签删除成功' })
  @ApiResponse({ status: 404, description: '标签不存在' })
  @ApiResponse({ status: 400, description: '该标签下有关联的文章，无法删除' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tagService.remove(id);
  }
}
