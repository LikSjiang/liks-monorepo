import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { Repository } from 'typeorm';
import { FileEntity } from './entities/file.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as crypto from 'crypto';
import { diskStoragePath } from '../../utils/constant';
import * as fs from 'fs';

@Injectable()
export class FileService {
  constructor(@InjectRepository(FileEntity) private readonly fileRepository: Repository<FileEntity>) {}

  async upload(file: Express.Multer.File) {
    const pathStr = file.path.replace(/\\/g, '/');
    const paths = pathStr.split(diskStoragePath);
    const createFileDto = new CreateFileDto();
    createFileDto.name = decodeURIComponent(file.originalname);
    createFileDto.originalname = file.originalname;
    createFileDto.size = file.size.toString();
    createFileDto.url = `/${diskStoragePath}${paths.at(-1)}`;
    createFileDto.mime = file.mimetype;
    createFileDto.hash = await this.calculateMD5(file.path);
    return this.create(createFileDto);
  }

  calculateMD5(filePath: string): Promise<string> {
    return new Promise((resolve, reject) => {
      // 创建一个 hash 实例
      const hash = crypto.createHash('md5');
      const stream = fs.createReadStream(filePath);

      stream.on('data', (data) => {
        hash.update(data); // 逐块更新 hash 值
      });

      stream.on('end', () => {
        const md5 = hash.digest('hex'); // 获取 MD5 值
        resolve(md5);
      });
      stream.on('error', (err) => {
        reject(err);
      });
    });
  }

  async checkFileExist(hash: string): Promise<FileEntity | null> {
    return this.fileRepository.findOne({
      where: {
        hash,
        deleted: 0,
      },
    });
  }
  // 检查本地文件是否存在
  checkLocalFileExists(filePath: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      fs.stat(filePath, (err, stats) => {
        console.log('stats', stats);
        if (err) {
          if (err.code === 'ENOENT') {
            // ENOENT 表示 'no such file or directory'
            resolve(false);
          } else {
            reject(err);
          }
        } else {
          resolve(true);
        }
      });
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
