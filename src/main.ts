import { NestFactory } from '@nestjs/core';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerCustomOptions,
} from '@nestjs/swagger';
import cors from 'cors';
import 'src/state';
import morgan from 'morgan';
import { AppModule } from 'src/modules/app/app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';
import { SensibleInformationRemovalInterceptor } from "./interceptors/sensible-info-removal";

function swagger(app: NestExpressApplication) {
  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription('The API')
    .addSecurity('basic', { type: 'http', scheme: 'basic', in: 'query' })
    .addSecurity('bearer', {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'jwt',
    })
    .addSecurity('apiKey', { type: 'apiKey', name: 'x-api-key', in: 'header' })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  const swaggerOptions: SwaggerCustomOptions = {
    customCssUrl: '/public/swagger.css',
  };
  SwaggerModule.setup('docs', app, document, swaggerOptions);
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // Serve public files
  app.useStaticAssets(join(__dirname, '.', 'public'), { prefix: '/public' });
  swagger(app);
  app.use(morgan('combined'));
  app.use(cors());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new SensibleInformationRemovalInterceptor());
  await app.listen(3000);
}
bootstrap();
