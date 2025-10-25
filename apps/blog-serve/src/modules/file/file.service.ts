import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { Repository } from 'typeorm';
import { FileEntity } from './entities/file.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as crypto from 'crypto';

@Injectable()
export class FileService {
  constructor(@InjectRepository(FileEntity) private readonly fileRepository: Repository<FileEntity>) {}

  async upload(file: Express.Multer.File) {
    const createFileDto = new CreateFileDto();
    createFileDto.name = file.originalname;
    createFileDto.size = file.size.toString();
    createFileDto.url = file.path;
    createFileDto.mime = file.mimetype;
    createFileDto.hash = this.getFileHash(file);
    return this.create(createFileDto);
  }
  getFileHash(file: Express.Multer.File): string {
    const hash = crypto.createHash('md5').update(file.buffer).digest('hex');
    return hash;
  }
  async checkFileExist(hash: string) {
    return this.fileRepository.findOne({
      where: {
        hash,
        deleted: 0,
      },
    });
  }
  create(createFileDto: CreateFileDto) {
    const file = this.fileRepository.create(createFileDto);
    return this.fileRepository.save(file);
  }

  async findAll(page: number = 1, size: number = 10): Promise<Global.ListRecord<FileEntity>> {
    const [list, total] = await this.fileRepository.findAndCount({
      where: {
        deleted: 0,
      },
      skip: (page - 1) * size,
      take: size,
    });
    const totalPages = Math.ceil(total / size);
    return {
      list,
      size,
      page,
      total,
      pages: totalPages,
      isEnd: [page, 0].includes(totalPages),
    };
  }

  async findOne(id: string): Promise<FileEntity | null> {
    if (!id) {
      return null;
    }
    return this.fileRepository.findOne({
      where: {
        id,
        deleted: 0,
      },
    });
  }

  async update(id: string, updateFileDto: UpdateFileDto) {
    const info = await this.findOne(id);
    if (!info) {
      throw new HttpException('文件不存在', HttpStatus.BAD_REQUEST);
    }
    Object.assign(info, updateFileDto);
    return this.fileRepository.save(info);
  }

  async remove(id: string) {
    const info = await this.findOne(id);
    if (!info) {
      throw new HttpException('文件不存在', HttpStatus.BAD_REQUEST);
    }
    info.deleted = 1;
    return this.fileRepository.save(info);
  }
}
