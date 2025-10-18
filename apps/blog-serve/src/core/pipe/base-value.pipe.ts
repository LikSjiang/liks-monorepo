import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
// 验证管道，用于验证query请求参数,解析int类型参数
export class UseBaseValuePipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    if (metadata.type === 'query' && typeof value === 'string') {
      console.log('UseIntPipe-value :==> ', value);
      // 解析int类型参数
      return value ? parseInt(value, 10) : value;
    }
    return value;
  }
}
