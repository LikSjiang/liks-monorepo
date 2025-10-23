/*
 * @Description: 标签模块
 * @Author: liks
 * @Date: 2025-10-23 16:53:38
 * @LastEditors: liks
 * @LastEditTime: 2025-10-23 16:59:39
 */
import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from './entities/tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tag])],
  controllers: [TagController],
  providers: [TagService],
})
export class TagModule {}
