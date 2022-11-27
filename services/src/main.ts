import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AppConfig } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService<AppConfig>);

  const doc = new DocumentBuilder().setTitle('Blue Dot Api').build();

  const document = SwaggerModule.createDocument(app, doc);
  SwaggerModule.setup('docs', app, document);

  await app.listen(configService.get('port'));
  Logger.log('Application runing at ' + (await app.getUrl()));
}
bootstrap();
