import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  DocumentBuilder,
  OpenAPIObject,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';

export interface SwaggerConfig {
  enabled: boolean;
  title: string;
  description: string;
  version: string;
  path: string;
}

export const swaggerSetupOptions: SwaggerCustomOptions = {
  swaggerOptions: {
    persistAuthorization: true,
  },
  // customCssUrl: './swagger/swagger.css',
  // customfavIcon: './swagger/favicon.png',
  customSiteTitle: 'API',
};

export async function setupSwagger(app: INestApplication) {
  const configService = app.get(ConfigService);
  const swaggerConfig = configService.get<SwaggerConfig>('swagger');

  const swaggerDocumentOptions = new DocumentBuilder()
    .addBearerAuth()
    .setTitle(swaggerConfig.title || 'API')
    .setDescription(swaggerConfig.description || 'API Documents')
    .setVersion(swaggerConfig.version || '1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerDocumentOptions);

  Object.values((document as OpenAPIObject).paths).forEach((path: any) => {
    Object.values(path).forEach((method: any) => {
      if (Array.isArray(method.security) && method.security.includes('isPublic')) {
        method.security = [];
      }
    });
  });
  SwaggerModule.setup(swaggerConfig.path || 'api', app, document, swaggerSetupOptions);
  console.log('Swagger setup success');
}
