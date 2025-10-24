/*
 * @Description: 权限服务
 * @Author: liks
 * @Date: 2025-10-24 11:05:24
 * @LastEditors: liks
 * @LastEditTime: 2025-10-24 11:24:07
 */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePermissonDto } from './dto/create-permisson.dto';
import { UpdatePermissonDto } from './dto/update-permisson.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Permisson } from './entities/permisson.entity';

@Injectable()
export class PermissonService {
  constructor(
    @InjectRepository(Permisson)
    private readonly permissonRepository: Repository<Permisson>,
  ) {}

  async create(createPermissonDto: CreatePermissonDto): Promise<null> {
    await this.permissonRepository.save(createPermissonDto);
    return null;
  }

  async findAll(page: number = 1, size: number = 10): Promise<Global.ListRecord<Permisson>> {
    const [roles, total] = await this.permissonRepository.findAndCount({
      skip: (page - 1) * size,
      take: size,
    });
    const totalPages = Math.ceil(total / size);
    return {
      list: roles,
      size,
      page,
      pages: totalPages,
      total,
      isEnd: [page, 0].includes(totalPages),
    };
  }

  findList(): Promise<Permisson[]> {
    return this.permissonRepository.find();
  }

  findOne(id: string): Promise<Permisson | null> {
    return this.permissonRepository.findOne({ where: { id } });
  }

  async update(id: string, updatePermissonDto: UpdatePermissonDto): Promise<null> {
    const info = await this.findOne(id);
    if (!info) {
      throw new HttpException('权限不存在', HttpStatus.BAD_REQUEST);
    }
    const updateInfo = {
      ...info,
      ...updatePermissonDto,
    };
    await this.permissonRepository.update(id, updateInfo);
    return null;
  }

  async remove(id: string): Promise<null> {
    const info = await this.findOne(id);
    if (!info) {
      throw new HttpException('权限不存在', HttpStatus.BAD_REQUEST);
    }
    await this.permissonRepository.delete(id);
    return null;
  }
}
