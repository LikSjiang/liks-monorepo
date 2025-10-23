/*
 * @Description: 分类服务
 * @Author: liks
 * @Date: 2025-10-23 16:20:15
 * @LastEditors: liks
 * @LastEditTime: 2025-10-23 16:39:08
 */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}
  async create(createCategoryDto: CreateCategoryDto): Promise<null> {
    const category = this.categoryRepository.create(createCategoryDto);
    await this.categoryRepository.save(category);
    return null;
  }

  async findAll(page: number = 1, size: number = 10): Promise<Category[]> {
    return this.categoryRepository.find({
      skip: (page - 1) * size,
      take: size,
    });
  }

  findList(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async findOne(id: string): Promise<Category | null> {
    return this.categoryRepository.findOne({
      where: {
        id,
      },
    });
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<null> {
    const info = await this.findOne(id);
    if (!info) {
      throw new HttpException('分类不存在', HttpStatus.BAD_REQUEST);
    }
    const updateInfo = {
      ...info,
      ...updateCategoryDto,
    };
    await this.categoryRepository.update(id, updateInfo);
    return null;
  }

  async remove(id: string): Promise<null> {
    const info = await this.findOne(id);
    if (!info) {
      throw new HttpException('分类不存在', HttpStatus.BAD_REQUEST);
    }
    await this.categoryRepository.delete(id);
    return null;
  }
}
