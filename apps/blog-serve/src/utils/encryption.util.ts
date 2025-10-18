// src/common/utils/encryption.util.ts
import * as bcrypt from 'bcryptjs';

export class EncryptionUtil {
  private static readonly SALT_ROUNDS = 12;

  /**
   * 生成随机盐
   */
  static async generateSalt(): Promise<string> {
    return bcrypt.genSalt(this.SALT_ROUNDS);
  }

  /**
   * 使用盐加密密码
   */
  static async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  /**
   * 验证密码
   */
  static async validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  /**
   * 生成盐并加密密码
   */
  static async hashPasswordWithNewSalt(password: string): Promise<{ hashedPassword: string; salt: string }> {
    const salt = await this.generateSalt();
    const hashedPassword = await this.hashPassword(password, salt);
    return { hashedPassword, salt };
  }
}
