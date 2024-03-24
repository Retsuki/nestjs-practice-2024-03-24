import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './common/filters/http-exception/http-exception.filter';
import { WrapResponseInterceptor } from './common/interceptors/wrap-response/wrap-response.interceptor';
import { TimeoutInterceptor } from './common/interceptors/timeout/timeout.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.useGlobalPipes に ValidationPipe を適用し、以下の設定で初期化します:
  app.useGlobalPipes(
    new ValidationPipe({
      // - whitelist: true に設定することで、DTOに定義されていないプロパティは自動的に除外されます。
      //   これにより、意図しないデータの流入を防ぐことができます。
      whitelist: true,

      // - forbidNonWhitelisted: true に設定すると、DTOに定義されていないプロパティが検出された場合に
      //   バリデーションエラーが発生します。これは、受け入れるべきでないデータが送られてきたときに
      //   明確にエラーを出すための設定です。
      forbidNonWhitelisted: true,

      // - transform: true にすると、受け取ったリクエストのパラメータやペイロードを
      //   定義されたDTOやパラメータの型に自動的に変換しようと試みます。
      //   これにより、手動での型変換の手間を省くことができます。
      transform: true,

      // - transformOptions: {
      //     enableImplicitConversion: true に設定すると、class-transformer は暗黙的な型変換を行います。
      //     例えば、"123" は数値の 123 に、"true"、"1"、"yes" は boolean の true に変換されます。
      //     これにより、より柔軟な型変換が可能となり、開発の効率化に寄与します。
      //   }
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(
    new WrapResponseInterceptor(),
    new TimeoutInterceptor(),
  );

  const options = new DocumentBuilder()
    .setTitle('Iluvcoffee')
    .setDescription('Coffee application')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
