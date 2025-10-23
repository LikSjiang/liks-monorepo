import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

/**
 * 角色管理控制器
 * 提供角色的增删改查等功能
 */
@ApiTags('角色管理')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  /**
   * 创建新角色
   * @param createRoleDto 角色创建数据
   * @returns 创建成功的角色信息
   */
  @ApiOperation({
    summary: '创建新角色',
    description: '根据提供的角色信息创建一个新的角色',
    operationId: 'createRole',
  })
  @ApiBody({
    type: CreateRoleDto,
    description: '角色创建数据',
    required: true,
  })
  @ApiResponse({
    status: 201,
    description: '角色创建成功',
    content: {
      'application/json': {
        example: {
          id: '1',
          name: '管理员',
          description: '系统管理员角色',
          createdAt: '2025-10-19T12:00:00Z',
          updatedAt: '2025-10-19T12:00:00Z',
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: '参数错误或角色已存在',
  })
  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  /**
   * 获取所有角色列表
   * @returns 角色列表
   */
  @ApiOperation({
    summary: '获取角色列表',
    description: '获取系统中所有角色的列表',
    operationId: 'getRoles',
  })
  @ApiResponse({
    status: 200,
    description: '获取角色列表成功',
    content: {
      'application/json': {
        example: [
          {
            id: '1',
            name: '管理员',
            description: '系统管理员角色',
            createdAt: '2025-10-19T12:00:00Z',
            updatedAt: '2025-10-19T12:00:00Z',
          },
          {
            id: '2',
            name: '普通用户',
            description: '普通用户角色',
            createdAt: '2025-10-19T12:00:00Z',
            updatedAt: '2025-10-19T12:00:00Z',
          },
        ],
      },
    },
  })
  @Get()
  findAll() {
    return this.roleService.findAll();
  }

  /**
   * 获取指定角色详情
   * @param id 角色ID
   * @returns 角色详情信息
   */
  @ApiOperation({
    summary: '获取角色详情',
    description: '根据角色ID获取指定角色的详细信息',
    operationId: 'getRoleById',
  })
  @ApiParam({
    name: 'id',
    description: '角色ID',
    type: String,
    required: true,
    example: '1',
  })
  @ApiResponse({
    status: 200,
    description: '获取角色详情成功',
    content: {
      'application/json': {
        example: {
          id: '1',
          name: '管理员',
          description: '系统管理员角色',
          createdAt: '2025-10-19T12:00:00Z',
          updatedAt: '2025-10-19T12:00:00Z',
        },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: '角色不存在',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(id);
  }

  /**
   * 更新指定角色信息
   * @param id 角色ID
   * @param updateRoleDto 角色更新数据
   * @returns 更新后的角色信息
   */
  @ApiOperation({
    summary: '更新角色信息',
    description: '根据角色ID更新指定角色的信息',
    operationId: 'updateRole',
  })
  @ApiParam({
    name: 'id',
    description: '角色ID',
    type: String,
    required: true,
    example: '1',
  })
  @ApiBody({
    type: UpdateRoleDto,
    description: '角色更新数据',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: '更新角色成功',
    content: {
      'application/json': {
        example: {
          id: '1',
          name: '超级管理员',
          description: '更新后的管理员角色',
          createdAt: '2025-10-19T12:00:00Z',
          updatedAt: '2025-10-19T12:30:00Z',
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: '参数错误',
  })
  @ApiResponse({
    status: 404,
    description: '角色不存在',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(id, updateRoleDto);
  }

  /**
   * 删除指定角色
   * @param id 角色ID
   * @returns 删除结果
   */
  @ApiOperation({
    summary: '删除角色',
    description: '根据角色ID删除指定角色',
    operationId: 'deleteRole',
  })
  @ApiParam({
    name: 'id',
    description: '角色ID',
    type: String,
    required: true,
    example: '1',
  })
  @ApiResponse({
    status: 200,
    description: '删除角色成功',
    content: {
      'application/json': {
        example: {
          success: true,
          message: '角色删除成功',
        },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: '角色不存在',
  })
  @ApiResponse({
    status: 400,
    description: '角色无法删除（例如有用户正在使用该角色）',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleService.remove(id);
  }
}
