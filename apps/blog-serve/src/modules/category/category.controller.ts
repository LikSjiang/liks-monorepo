/*
 * @Description: 分类控制器
 * @Author: liks
 * @Date: 2025-10-23 16:20:15
 * @LastEditors: liks
 * @LastEditTime: 2025-10-23 16:47:30
 */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@ApiTags('分类管理')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiBody({
    type: CreateCategoryDto,
    description: '分类创建信息',
    examples: {
      example1: {
        summary: '创建分类示例',
        value: {
          name: '前端',
          sort: 0,
          pId: '',
          slug: 'frontend',
          keywords: '前端,JavaScript',
          description: '前端相关内容',
        },
      },
    },
  })
  @ApiOperation({
    summary: '创建分类',
    description: '创建新的分类，支持设置名称、排序、父级分类等信息',
  })
  @ApiResponse({
    status: 201,
    description: '分类创建成功',
    schema: {
      example: {
        id: '1',
        name: '前端',
        sort: 0,
        pId: '',
        link: 'frontend',
        keywords: '前端,JavaScript',
        description: '前端相关内容',
        createdAt: '2025-10-23T16:20:15.000Z',
        updatedAt: '2025-10-23T16:20:15.000Z',
      },
    },
  })
  @ApiResponse({ status: 400, description: '参数错误或分类名称已存在' })
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @ApiOperation({
    summary: '获取所有分类',
    description: '获取完整的分类列表，包含所有分类信息',
  })
  @ApiResponse({
    status: 200,
    description: '分类列表获取成功',
    schema: {
      example: [
        {
          id: '1',
          name: '前端',
          sort: 0,
          pId: '',
          slug: 'frontend',
          keywords: '前端,JavaScript',
          description: '前端相关内容',
          createdAt: '2025-10-23T16:20:15.000Z',
          updatedAt: '2025-10-23T16:20:15.000Z',
        },
        {
          id: '2',
          name: '后端',
          sort: 1,
          pId: '',
          slug: 'backend',
          keywords: '后端,Node.js',
          description: '后端相关内容',
          createdAt: '2025-10-23T16:20:15.000Z',
          updatedAt: '2025-10-23T16:20:15.000Z',
        },
      ],
    },
  })
  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @ApiOperation({
    summary: '获取分类列表（精简版）',
    description: '获取精简版分类列表，通常用于前端展示和选择',
  })
  @ApiResponse({
    status: 200,
    description: '精简分类列表获取成功',
    schema: {
      example: [
        {
          id: '1',
          name: '前端',
          children: [
            {
              id: '3',
              name: 'JavaScript',
              children: [],
            },
            {
              id: '4',
              name: 'Vue',
              children: [],
            },
          ],
        },
        {
          id: '2',
          name: '后端',
          children: [
            {
              id: '5',
              name: 'Node.js',
              children: [],
            },
          ],
        },
      ],
    },
  })
  @Get('list')
  findList() {
    return this.categoryService.findList();
  }

  @ApiOperation({
    summary: '获取单个分类信息',
    description: '根据分类ID获取指定分类的详细信息',
  })
  @ApiParam({
    name: 'id',
    description: '分类ID',
    required: true,
    example: '1',
  })
  @ApiResponse({
    status: 200,
    description: '分类信息获取成功',
    schema: {
      example: {
        id: '1',
        name: '前端',
        sort: 0,
        pId: '',
        slug: 'frontend',
        keywords: '前端,JavaScript',
        description: '前端相关内容',
        createdAt: '2025-10-23T16:20:15.000Z',
        updatedAt: '2025-10-23T16:20:15.000Z',
      },
    },
  })
  @ApiResponse({ status: 404, description: '分类不存在' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(id);
  }

  @ApiOperation({
    summary: '更新分类信息',
    description: '根据分类ID更新分类的相关信息',
  })
  @ApiParam({
    name: 'id',
    description: '分类ID',
    required: true,
    example: '1',
  })
  @ApiResponse({
    status: 200,
    description: '分类更新成功',
    schema: {
      example: {
        id: '1',
        name: '前端开发',
        sort: 0,
        pId: '',
        slug: 'frontend-dev',
        keywords: '前端,JavaScript,HTML,CSS',
        description: '前端开发相关内容',
        createdAt: '2025-10-23T16:20:15.000Z',
        updatedAt: '2025-10-23T16:30:15.000Z',
      },
    },
  })
  @ApiResponse({ status: 404, description: '分类不存在' })
  @ApiResponse({ status: 400, description: '参数错误' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @ApiOperation({
    summary: '删除分类',
    description: '根据分类ID删除指定分类',
  })
  @ApiParam({
    name: 'id',
    description: '分类ID',
    required: true,
    example: '1',
  })
  @ApiResponse({ status: 200, description: '分类删除成功' })
  @ApiResponse({ status: 404, description: '分类不存在' })
  @ApiResponse({ status: 400, description: '该分类下有子分类或关联的文章，无法删除' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }
}
