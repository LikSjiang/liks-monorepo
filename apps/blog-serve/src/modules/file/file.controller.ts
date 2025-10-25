import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileService } from './file.service';
// import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { storage } from './storage';
@ApiTags('文件管理')
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @ApiOperation({ summary: '上传文件', description: '上传单个文件到服务器' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: '要上传的文件',
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: '文件上传成功' })
  @ApiResponse({ status: 400, description: '请求参数错误' })
  @ApiResponse({ status: 500, description: '服务器内部错误' })
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', { storage }))
  upload(@UploadedFile() file: Express.Multer.File) {
    console.log('上传文件', file);
    return this.fileService.upload(file);
  }

  @ApiOperation({ summary: '获取所有文件', description: '获取系统中所有文件的列表' })
  @ApiResponse({ status: 200, description: '获取文件列表成功' })
  @ApiResponse({ status: 500, description: '服务器内部错误' })
  @Get()
  findAll() {
    return this.fileService.findAll();
  }

  @ApiOperation({ summary: '获取单个文件', description: '根据文件ID获取文件详情' })
  @ApiParam({ name: 'id', description: '文件ID', required: true })
  @ApiResponse({ status: 200, description: '获取文件详情成功' })
  @ApiResponse({ status: 404, description: '文件不存在' })
  @ApiResponse({ status: 500, description: '服务器内部错误' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fileService.findOne(id);
  }

  @ApiOperation({ summary: '检查文件是否存在', description: '根据文件哈希值检查文件是否存在' })
  @ApiParam({ name: 'hash', description: '文件哈希值', required: true })
  @ApiResponse({ status: 200, description: '文件存在' })
  @ApiResponse({ status: 404, description: '文件不存在' })
  @ApiResponse({ status: 500, description: '服务器内部错误' })
  @Get('checkExist/:hash')
  checkFileExist(@Param('hash') hash: string) {
    return this.fileService.checkFileExist(hash);
  }

  @ApiOperation({ summary: '更新文件信息', description: '根据文件ID更新文件信息' })
  @ApiParam({ name: 'id', description: '文件ID', required: true })
  @ApiBody({ type: UpdateFileDto, description: '文件更新信息' })
  @ApiResponse({ status: 200, description: '文件信息更新成功' })
  @ApiResponse({ status: 400, description: '请求参数错误' })
  @ApiResponse({ status: 404, description: '文件不存在' })
  @ApiResponse({ status: 500, description: '服务器内部错误' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFileDto: UpdateFileDto) {
    return this.fileService.update(id, updateFileDto);
  }

  @ApiOperation({ summary: '删除文件', description: '根据文件ID删除文件' })
  @ApiParam({ name: 'id', description: '文件ID', required: true })
  @ApiResponse({ status: 200, description: '文件删除成功' })
  @ApiResponse({ status: 404, description: '文件不存在' })
  @ApiResponse({ status: 500, description: '服务器内部错误' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fileService.remove(id);
  }
}
