import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SettingService } from './setting.service';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('系统设置')
@Controller('setting')
export class SettingController {
  constructor(private readonly settingService: SettingService) {}

  @ApiOperation({ summary: '创建设置项', description: '创建新的系统设置项' })
  @ApiBody({ type: CreateSettingDto, description: '设置项创建信息' })
  @ApiResponse({ status: 201, description: '设置项创建成功' })
  @ApiResponse({ status: 400, description: '请求参数错误' })
  @ApiResponse({ status: 500, description: '服务器内部错误' })
  @Post()
  create(@Body() createSettingDto: CreateSettingDto) {
    return this.settingService.create(createSettingDto);
  }

  @ApiOperation({ summary: '获取所有设置项', description: '获取系统中所有设置项的列表' })
  @ApiResponse({ status: 200, description: '获取设置项列表成功' })
  @ApiResponse({ status: 500, description: '服务器内部错误' })
  @Get()
  findAll() {
    return this.settingService.findAll();
  }

  @ApiOperation({ summary: '获取单个设置项', description: '根据设置项ID获取设置详情' })
  @ApiParam({ name: 'id', description: '设置项ID', required: true })
  @ApiResponse({ status: 200, description: '获取设置项详情成功' })
  @ApiResponse({ status: 404, description: '设置项不存在' })
  @ApiResponse({ status: 500, description: '服务器内部错误' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.settingService.findOne(id);
  }

  @ApiOperation({ summary: '更新设置项', description: '根据设置项ID更新设置信息' })
  @ApiParam({ name: 'id', description: '设置项ID', required: true })
  @ApiBody({ type: UpdateSettingDto, description: '设置更新信息' })
  @ApiResponse({ status: 200, description: '设置项更新成功' })
  @ApiResponse({ status: 400, description: '请求参数错误' })
  @ApiResponse({ status: 404, description: '设置项不存在' })
  @ApiResponse({ status: 500, description: '服务器内部错误' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSettingDto: UpdateSettingDto) {
    return this.settingService.update(id, updateSettingDto);
  }

  @ApiOperation({ summary: '删除设置项', description: '根据设置项ID删除设置' })
  @ApiParam({ name: 'id', description: '设置项ID', required: true })
  @ApiResponse({ status: 200, description: '设置项删除成功' })
  @ApiResponse({ status: 404, description: '设置项不存在' })
  @ApiResponse({ status: 500, description: '服务器内部错误' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.settingService.remove(id);
  }
}
