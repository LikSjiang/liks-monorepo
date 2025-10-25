import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { BindPermissonDto } from './dto/bind-permisson.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { Permisson } from '../permisson/entities/permisson.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(Permisson)
    private permissonRepository: Repository<Permisson>,
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
    if (!id) {
      return Promise.resolve(null);
    }
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

  /**
   * 角色绑定权限
   * @param roleId 角色ID
   * @param bindPermissonDto 权限ID列表
   * @returns 绑定结果
   */
  async bindPermissons(roleId: string, bindPermissonDto: BindPermissonDto): Promise<{ success: boolean; message: string }> {
    // 验证角色是否存在
    const role = await this.roleRepository.findOne({ where: { id: roleId }, relations: ['permissons'] });
    if (!role) {
      throw new HttpException('角色不存在', HttpStatus.BAD_REQUEST);
    }

    // 验证权限是否都存在
    const permissons = await this.permissonRepository.find({ where: { id: In(bindPermissonDto.permissonIds) } });
    if (permissons.length !== bindPermissonDto.permissonIds.length) {
      throw new HttpException('部分权限不存在', HttpStatus.BAD_REQUEST);
    }

    // 清除现有关联并创建新的关联
    await this.roleRepository.createQueryBuilder().relation(Role, 'permissons').of(role).remove(role.permissons);

    await this.roleRepository.createQueryBuilder().relation(Role, 'permissons').of(role).add(permissons);

    return {
      success: true,
      message: `角色${role.name}权限绑定成功，共绑定${permissons.length}个权限`,
    };
  }

  /**
   * 获取角色拥有的权限
   * @param roleId 角色ID
   * @returns 权限列表
   */
  async getRolePermissons(roleId: string): Promise<Permisson[]> {
    const role = await this.roleRepository.findOne({
      where: { id: roleId },
      relations: ['permissons'],
    });

    if (!role) {
      throw new HttpException('角色不存在', HttpStatus.BAD_REQUEST);
    }

    return role.permissons;
  }
}
