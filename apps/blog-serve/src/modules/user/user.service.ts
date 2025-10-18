import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { EncryptionUtil, isNotEmpty } from '../../utils/index';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { username, email, password } = createUserDto;

    // 检查用户是否已存在
    const existingUser = await this.usersRepository.findOne({
      where: [{ username }, { email }],
    });
    console.log('existingUser', existingUser);

    if (existingUser) {
      throw new ConflictException('用户名或邮箱已存在');
    }

    // 生成盐并加密密码
    const { hashedPassword, salt } = await EncryptionUtil.hashPasswordWithNewSalt(password);

    const user = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
      salt,
    });
    console.log('新增用户：==>', user);
    // 保存用户到数据库
    return await this.usersRepository.save(user);
  }

  async findByUsername(username: string): Promise<User | null> {
    return await this.usersRepository.findOne({ where: { username } });
  }

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.findByUsername(username);
    if (!user) {
      return null;
    }

    const isValid = await EncryptionUtil.validatePassword(password, user.password);
    return isValid ? user : null;
  }

  async findById(id: string): Promise<User | null> {
    return await this.usersRepository.findOne({ where: { id } });
  }

  // 分页查询所有用户，username 可选， tel 可选， nickname 可选， status 可选，gender 可选，deleted 可选
  async findAll(page: number = 1, size: number = 10, username?: string, tel?: string, nickname?: string, status?: number, gender?: string, deleted?: number): Promise<User[]> {
    // 处理参数：当参数为空字符串时忽略该条件，查询所有数据
    return await this.usersRepository.find({
      skip: (page - 1) * size,
      take: size,
      where: {
        username: isNotEmpty(username) ? Like(`%${username}%`) : undefined,
        tel: isNotEmpty(tel) ? Like(`%${tel}%`) : undefined,
        nickname: isNotEmpty(nickname) ? Like(`%${nickname}%`) : undefined,
        status: isNotEmpty(status) ? status : undefined,
        gender: isNotEmpty(gender) ? gender : undefined,
        deleted: isNotEmpty(deleted) ? deleted : undefined,
      },
    });
  }

  // 根据ID查询用户
  async findOne(id: string): Promise<User | null> {
    return await this.usersRepository.findOne({ where: { id } });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User | null> {
    const user = await this.findById(id);
    if (!user) {
      return null;
    }

    // 更新用户信息
    Object.assign(user, updateUserDto);
    return await this.usersRepository.save(user);
  }

  async remove(id: string): Promise<User | null> {
    const user = await this.findById(id);
    if (!user) {
      return null;
    }

    return await this.usersRepository.remove(user);
  }
}
