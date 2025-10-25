/*
 * @Description: 标签服务
 * @Author: liks
 * @Date: 2025-10-23 16:53:38
 * @LastEditors: liks
 * @LastEditTime: 2025-10-23 17:02:42
 */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from './entities/tag.entity';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}
  /**
   * @description: 创建标签
   * @param {CreateTagDto} createTagDto
   * @return {*}
   */
  async create(createTagDto: CreateTagDto): Promise<null> {
    await this.tagRepository.save(createTagDto);
    return null;
  }

  /**
   * @description: 分页查询标签
   * @return {*}
   */
  async findAll(page: number = 1, size: number = 10): Promise<Global.ListRecord<Tag>> {
    const [tags, total] = await this.tagRepository.findAndCount({
      skip: (page - 1) * size,
      take: size,
    });
    const totalPages = Math.ceil(total / size);
    return {
      list: tags,
      size,
      page,
      pages: totalPages,
      total,
      isEnd: [page, 0].includes(totalPages),
    };
  }

  /**
   * @description: 查询标签列表
   * @return {*}
   */
  async findList(): Promise<Tag[]> {
    return await this.tagRepository.find();
  }

  /**
   * @description: 查询标签详情
   * @param {number} id
   * @return {*}
   */
  async findOne(id: string): Promise<Tag | null> {
    if (!id) {
      return Promise.resolve(null);
    }
    return await this.tagRepository.findOne({
      where: {
        id,
      },
    });
  }

  /**
   * @description: 更新标签
   * @param {string} id
   * @param {UpdateTagDto} updateTagDto
   * @return {*}
   */
  async update(id: string, updateTagDto: UpdateTagDto): Promise<null> {
    const info = await this.findOne(id);
    if (!info) {
      throw new HttpException('标签不存在', HttpStatus.BAD_REQUEST);
    }
    const updateInfo = {
      ...info,
      ...updateTagDto,
    };
    await this.tagRepository.update(id, updateInfo);
    return null;
  }

  /**
   * @description: 删除标签
   * @param {string} id
   * @return {*}
   */
  async remove(id: string): Promise<null> {
    const info = await this.findOne(id);
    if (!info) {
      throw new HttpException('标签不存在', HttpStatus.BAD_REQUEST);
    }
    await this.tagRepository.delete(id);
    return null;
  }
}
