import { Injectable, ConflictException, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Like, Repository } from 'typeorm';
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
  // 选择返回的字段
  selectFields: FindOneOptions<User>['select'] = ['id', 'username', 'nickname', 'email', 'tel', 'status', 'gender', 'birthday', 'createdAt', 'updatedAt'];

  // 创建用户
  async create(createUserDto: CreateUserDto): Promise<null> {
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
    await this.usersRepository.save(user);
    return null;
  }

  // 根据用户名查询用户
  async findByUsername(username: string): Promise<User | null> {
    return await this.usersRepository.findOne({ where: { username } });
  }

  // 验证用户密码
  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.findByUsername(username);
    if (!user) {
      return null;
    }
    const isValid = await EncryptionUtil.validatePassword(password, user.password);
    console.log('validateUser', isValid, user);
    return isValid ? user : null;
  }

  // 根据ID查询用户
  async findById(id: string): Promise<User | null> {
    return await this.usersRepository.findOne({ where: { id }, select: this.selectFields });
  }

  // 分页查询所有用户
  async findAll(page: number = 1, size: number = 10, username?: string, tel?: string, nickname?: string, status?: number, gender?: string, deleted?: number): Promise<User[]> {
    // 处理参数：当参数为空字符串时忽略该条件，查询所有数据
    return await this.usersRepository.find({
      // 分页：默认第1页，每页10条数据
      skip: (page - 1) * size,
      take: size,
      // 选择返回的字段
      select: this.selectFields,
      // 排序：默认按创建时间降序
      order: {
        createdAt: 'DESC',
      },
      // 查询条件：username 可选， tel 可选， nickname 可选， status 可选，gender 可选，deleted 可选
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
    return await this.usersRepository.findOne({ where: { id }, select: this.selectFields });
  }

  // 更新用户信息
  async update(id: string, updateUserDto: UpdateUserDto): Promise<null> {
    const user = await this.findById(id);
    if (!user) {
      throw new HttpException('用户不存在!', 400);
    }
    const { password, ...rest } = updateUserDto;
    // 如果密码存在，重新加密并更新盐
    if (password) {
      const { hashedPassword, salt } = await EncryptionUtil.hashPasswordWithNewSalt(password);
      user.password = hashedPassword;
      user.salt = salt;
    }
    // 更新用户信息
    const updatedUser = this.usersRepository.merge(user, rest);
    console.log('updatedUser', updatedUser);
    await this.usersRepository.save(updatedUser);
    return null;
  }

  // 删除用户-软删除
  async remove(id: string): Promise<null> {
    const user = await this.findById(id);
    if (!user) {
      throw new HttpException('用户不存在!', 400);
    }
    // 将deleted字段设置为1
    await this.usersRepository.save({ ...user, deleted: 1 });
    // await this.usersRepository.softRemove(user);
    return null;
  }
}
