import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { Repository } from 'typeorm';
import { Setting } from './entities/setting.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SettingService {
  constructor(@InjectRepository(Setting) private readonly settingRepository: Repository<Setting>) {}

  async create(createSettingDto: CreateSettingDto): Promise<null> {
    const setting = this.settingRepository.create(createSettingDto);
    await this.settingRepository.save(setting);
    return null;
  }

  async findAll(): Promise<Setting[]> {
    return this.settingRepository.find();
  }

  async findOne(id: string): Promise<Setting | null> {
    return this.settingRepository.findOne({ where: { id } });
  }

  async update(id: string, updateSettingDto: UpdateSettingDto): Promise<null> {
    const info = await this.findOne(id);
    if (!info) {
      throw new HttpException('选项不存在', HttpStatus.BAD_REQUEST);
    }
    const updateInfo = {
      ...info,
      ...updateSettingDto,
    };
    await this.settingRepository.update(id, updateInfo);
    return null;
  }

  async remove(id: string): Promise<null> {
    await this.settingRepository.delete(id);
    return null;
  }
}
