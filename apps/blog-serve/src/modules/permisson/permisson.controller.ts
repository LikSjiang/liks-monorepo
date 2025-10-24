import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PermissonService } from './permisson.service';
import { CreatePermissonDto } from './dto/create-permisson.dto';
import { UpdatePermissonDto } from './dto/update-permisson.dto';

@Controller('permisson')
export class PermissonController {
  constructor(private readonly permissonService: PermissonService) {}

  @Post()
  create(@Body() createPermissonDto: CreatePermissonDto) {
    return this.permissonService.create(createPermissonDto);
  }

  @Get()
  findAll() {
    return this.permissonService.findAll();
  }

  @Get('list')
  findList() {
    return this.permissonService.findList();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.permissonService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePermissonDto: UpdatePermissonDto) {
    return this.permissonService.update(id, updatePermissonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.permissonService.remove(id);
  }
}
