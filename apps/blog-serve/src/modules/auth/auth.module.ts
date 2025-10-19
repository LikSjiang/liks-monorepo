import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule, JwtSignOptions } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
import { JwtConfig } from '../../config/config.types';

/**
 * 认证模块
 */
@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const jwtConfig: JwtConfig = configService.get<JwtConfig>('jwt', {} as JwtConfig);
        console.log('jwtConfig', jwtConfig);

        // 从配置中获取 JwtSignOptions
        const jwtSignOptions: JwtSignOptions = jwtConfig.signOptions || { expiresIn: '1h' };
        return {
          global: true, // 设置为全局模块，确保JwtService在整个应用中可用
          secret: jwtConfig.secret || 'custom-secret-key',
          signOptions: jwtSignOptions,
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
