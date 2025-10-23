import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async create(createRoleDto: CreateRoleDto): Promise<null> {
    await this.roleRepository.save(createRoleDto);
    return null;
  }

  async findAll(page: number = 1, size: number = 10): Promise<Global.ListRecord<Role>> {
    const [roles, total] = await this.roleRepository.findAndCount({
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

  findList(): Promise<Role[]> {
    return this.roleRepository.find();
  }

  findOne(id: string): Promise<Role | null> {
    return this.roleRepository.findOneBy({ id });
  }

  async update(id: string, updateRoleDto: UpdateRoleDto): Promise<null> {
    const info = await this.findOne(id);
    if (!info) {
      throw new HttpException('角色不存在', HttpStatus.BAD_REQUEST);
    }
    const updateInfo = {
      ...info,
      ...updateRoleDto,
    };
    await this.roleRepository.update(id, updateInfo);
    return null;
  }

  async remove(id: string): Promise<null> {
    const info = await this.findOne(id);
    if (!info) {
      throw new HttpException('角色不存在', HttpStatus.BAD_REQUEST);
    }
    await this.roleRepository.delete(id);
    return null;
  }
}
