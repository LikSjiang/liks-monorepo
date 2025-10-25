import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { PermissonService } from './permisson.service';
import { CreatePermissonDto } from './dto/create-permisson.dto';
import { UpdatePermissonDto } from './dto/update-permisson.dto';

/**
 * 权限控制器
 * 负责处理权限相关的HTTP请求
 */
@ApiTags('权限管理') // 为控制器添加标签
@Controller('permisson')
export class PermissonController {
  constructor(private readonly permissonService: PermissonService) {}

  /**
   * 创建新权限
   * @param createPermissonDto 权限创建数据传输对象
   * @returns 创建成功的权限对象
   */
  @ApiOperation({
    summary: '创建新权限',
    description: '根据提供的权限信息创建一个新的权限',
  })
  @ApiBody({
    type: CreatePermissonDto,
    description: '权限创建所需的数据',
    examples: {
      example1: {
        summary: '创建用户管理权限',
        value: {
          name: '用户管理',
          code: 'user_manage',
          description: '用户管理相关权限',
          type: 'menu',
        },
      },
      example2: {
        summary: '创建角色管理权限',
        value: {
          name: '角色管理',
          code: 'role_manage',
          description: '角色管理相关权限',
          type: 'menu',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: '权限创建成功',
    content: {
      'application/json': {
        example: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: '用户管理',
          code: 'user_manage',
          description: '用户管理相关权限',
          type: 'menu',
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
  create(@Body() createPermissonDto: CreatePermissonDto) {
    return this.permissonService.create(createPermissonDto);
  }

  /**
   * 获取所有权限列表
   * @returns 权限列表数组
   */
  @ApiOperation({
    summary: '获取权限列表',
    description: '获取所有权限的完整列表',
  })
  @ApiResponse({
    status: 200,
    description: '成功获取权限列表',
    content: {
      'application/json': {
        example: [
          {
            id: '123e4567-e89b-12d3-a456-426614174000',
            name: '用户管理',
            code: 'user_manage',
            description: '用户管理相关权限',
            type: 'menu',
          },
          {
            id: '223e4567-e89b-12d3-a456-426614174001',
            name: '角色管理',
            code: 'role_manage',
            description: '角色管理相关权限',
            type: 'menu',
          },
        ],
      },
    },
  })
  @Get()
  findAll() {
    return this.permissonService.findAll();
  }

  /**
   * 获取权限列表（简化版）
   * @returns 简化的权限列表数组
   */
  @ApiOperation({
    summary: '获取权限列表（简化版）',
    description: '获取简化格式的权限列表，通常用于下拉选择等场景',
  })
  @ApiResponse({
    status: 200,
    description: '成功获取简化权限列表',
    content: {
      'application/json': {
        example: [
          {
            label: '用户管理',
            value: 'user_manage',
          },
          {
            label: '角色管理',
            value: 'role_manage',
          },
        ],
      },
    },
  })
  @Get('list')
  findList() {
    return this.permissonService.findList();
  }

  /**
   * 根据ID获取权限详情
   * @param id 权限ID
   * @returns 权限详情对象
   */
  @ApiOperation({
    summary: '获取权限详情',
    description: '根据权限ID获取指定权限的详细信息',
  })
  @ApiParam({
    name: 'id',
    description: '权限ID',
    type: String,
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: '成功获取权限详情',
    content: {
      'application/json': {
        example: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: '用户管理',
          code: 'user_manage',
          description: '用户管理相关权限',
          type: 'menu',
          createdAt: '2025-10-19T12:00:00Z',
          updatedAt: '2025-10-19T12:00:00Z',
        },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: '权限不存在',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.permissonService.findOne(id);
  }

  /**
   * 更新权限信息
   * @param id 权限ID
   * @param updatePermissonDto 权限更新数据传输对象
   * @returns 更新后的权限对象
   */
  @ApiOperation({
    summary: '更新权限',
    description: '根据权限ID更新指定权限的信息',
  })
  @ApiParam({
    name: 'id',
    description: '权限ID',
    type: String,
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiBody({
    type: UpdatePermissonDto,
    description: '权限更新所需的数据',
    examples: {
      example1: {
        summary: '更新权限信息',
        value: {
          name: '用户管理（更新）',
          description: '更新后的用户管理权限描述',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: '权限更新成功',
    content: {
      'application/json': {
        example: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: '用户管理（更新）',
          code: 'user_manage',
          description: '更新后的用户管理权限描述',
          type: 'menu',
          updatedAt: '2025-10-19T13:00:00Z',
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: '请求参数错误',
  })
  @ApiResponse({
    status: 404,
    description: '权限不存在',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePermissonDto: UpdatePermissonDto) {
    return this.permissonService.update(id, updatePermissonDto);
  }

  /**
   * 删除权限
   * @param id 权限ID
   * @returns 删除结果
   */
  @ApiOperation({
    summary: '删除权限',
    description: '根据权限ID删除指定权限',
  })
  @ApiParam({
    name: 'id',
    description: '权限ID',
    type: String,
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: '权限删除成功',
    content: {
      'application/json': {
        example: {
          success: true,
          message: '权限删除成功',
        },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: '权限不存在',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.permissonService.remove(id);
  }
}
