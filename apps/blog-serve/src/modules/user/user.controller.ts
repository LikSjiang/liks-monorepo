import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, DefaultValuePipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiBody, ApiResponse, ApiOkResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UseBaseValuePipe } from '../../core/pipe/base-value.pipe';

@ApiTags('用户管理')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: '创建用户',
    description: '根据提供的用户信息创建新用户',
  })
  @ApiBody({
    type: CreateUserDto,
    description: '用户创建信息',
    examples: {
      example1: {
        summary: '创建用户示例',
        value: {
          username: 'zhangsan',
          password: 'Pass123!',
          email: 'zhangsan@example.com',
          nickname: '张三',
          tel: '13800138000',
          gender: 0,
          birthday: '1990-01-01',
        },
      },
    },
  })
  @ApiCreatedResponse({
    description: '用户创建成功',
    schema: {
      example: {
        id: '1',
        username: 'zhangsan',
        email: 'zhangsan@example.com',
        nickname: '张三',
        tel: '13800138000',
        gender: 0,
        birthday: '1990-01-01',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
      },
    },
  })
  @ApiResponse({ status: 400, description: '请求参数错误' })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    console.log('createUserDto', createUserDto);
    return this.userService.create(createUserDto);
  }

  @ApiOperation({
    summary: '获取所有用户',
    description: '获取系统中所有用户的列表',
  })
  @ApiOkResponse({
    description: '获取用户列表成功',
    schema: {
      example: [
        {
          id: '1',
          username: 'zhangsan',
          email: 'zhangsan@example.com',
          nickname: '张三',
          tel: '13800138000',
          gender: 0,
          birthday: '1990-01-01',
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z',
        },
        {
          id: '2',
          username: 'lisi',
          email: 'lisi@example.com',
          nickname: '李四',
          tel: '13900139000',
          gender: 1,
          birthday: '1991-02-02',
          createdAt: '2024-01-02T00:00:00Z',
          updatedAt: '2024-01-02T00:00:00Z',
        },
      ],
    },
  })
  @Get()
  // 使用自定义管道 UseIntPipe
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('size', new DefaultValuePipe(10), ParseIntPipe) size: number,
    @Query('username') username?: string,
    @Query('tel') tel?: string,
    @Query('nickname') nickname?: string,
    @Query('status', new UseBaseValuePipe()) status?: number,
    @Query('gender') gender?: string,
    @Query('deleted', new UseBaseValuePipe()) deleted?: number,
  ) {
    console.log('page :==> ', page, 'size :==> ', size, 'username', username, 'tel', tel, 'nickname', nickname, 'status', status, 'gender', gender, 'deleted', deleted);

    return this.userService.findAll(page, size, username, tel, nickname, status, gender, deleted);
  }

  @ApiOperation({
    summary: '获取单个用户',
    description: '根据用户ID获取用户详细信息',
  })
  @ApiParam({ name: 'id', description: '用户ID', required: true })
  @ApiOkResponse({
    description: '获取用户信息成功',
    schema: {
      example: {
        id: '1',
        username: 'zhangsan',
        email: 'zhangsan@example.com',
        nickname: '张三',
        tel: '13800138000',
        gender: 0,
        birthday: '1990-01-01',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
      },
    },
  })
  @ApiResponse({ status: 404, description: '用户不存在' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @ApiOperation({
    summary: '更新用户信息',
    description: '根据用户ID更新用户信息，所有字段都是可选的',
  })
  @ApiParam({ name: 'id', description: '用户ID', required: true })
  @ApiBody({
    type: UpdateUserDto,
    description: '用户更新信息',
    examples: {
      example1: {
        summary: '更新用户昵称和性别',
        value: {
          nickname: '张三更新',
          gender: 1,
        },
      },
      example2: {
        summary: '更新用户联系方式',
        value: {
          email: 'newemail@example.com',
          tel: '13700137000',
        },
      },
    },
  })
  @ApiOkResponse({
    description: '用户信息更新成功',
    schema: {
      example: {
        id: '1',
        username: 'zhangsan',
        email: 'newemail@example.com',
        nickname: '张三更新',
        tel: '13700137000',
        gender: 1,
        birthday: '1990-01-01',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-05T10:30:00Z',
      },
    },
  })
  @ApiResponse({ status: 400, description: '请求参数错误' })
  @ApiResponse({ status: 404, description: '用户不存在' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @ApiOperation({ summary: '删除用户', description: '根据用户ID删除用户' })
  @ApiParam({ name: 'id', description: '用户ID', required: true })
  @ApiOkResponse({
    description: '用户删除成功',
    schema: {
      example: {
        success: true,
        message: '用户删除成功',
        id: '1',
      },
    },
  })
  @ApiResponse({ status: 404, description: '用户不存在' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
