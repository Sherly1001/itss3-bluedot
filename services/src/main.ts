import { BadRequestException, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { appConfig, AppConfig } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => new BadRequestException(errors),
    }),
  );

  const cfg = app.get<AppConfig>(appConfig.KEY);

  const doc = new DocumentBuilder()
    .setTitle('Blue Dot Api')
    .addBearerAuth({
      type: 'apiKey',
      scheme: 'JWT',
      name: 'Authorization',
      description: 'Type into the text box: Bearer {your JWT}',
      in: 'header',
    })
    .build();

  const document = SwaggerModule.createDocument(app, doc);
  SwaggerModule.setup('docs', app, document);

  await app.listen(cfg.port);
  Logger.log('Application runing at ' + (await app.getUrl()));
}
bootstrap();
