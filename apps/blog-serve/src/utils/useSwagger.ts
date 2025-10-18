import { INestApplication } from '@nestjs/common';
import { SwaggerConfig } from '../config/config.types';
import { SwaggerModule, DocumentBuilder, SwaggerCustomOptions } from '@nestjs/swagger';

export function useSwagger(app: INestApplication, swaggerConfig: SwaggerConfig): void {
  console.log('swagger-config', swaggerConfig);
  if (!swaggerConfig.enabled) {
    return;
  }
  const config = new DocumentBuilder().setTitle(swaggerConfig.title).setDescription(swaggerConfig.description).setVersion(swaggerConfig.version).addTag(swaggerConfig.tag).build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  const options: SwaggerCustomOptions = {
    jsonDocumentUrl: swaggerConfig.jsonDocumentUrl,
    ui: true, // Swagger UI is enabled
    raw: ['json'], // JSON API definition is still accessible (YAML is disabled)
  };
  SwaggerModule.setup(swaggerConfig.path, app, documentFactory, options);
}
