/*
 * @Description: 公共路由装饰器
 * @Author: liks
 * @Date: 2025-10-23 14:56:35
 * @LastEditors: liks
 * @LastEditTime: 2025-10-23 15:24:14
 */
import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'IsPublic';

// 自定义装饰器
export const IsPublic = () => SetMetadata(IS_PUBLIC_KEY, true);
