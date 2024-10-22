import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as passport from 'passport';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*', // Убедитесь, что домен совпадает с фронтендом
    methods: 'GET,POST,PUT,PATCH,DELETE,HEAD',
    allowedHeaders: '*',
    credentials: true, // Включаем для отправки куки
  });

  app.use(cookieParser());
  app.use(passport.initialize());

  await app.listen(5174).then(() => {
    console.log(`Server started at http://localhost:${5174}`);
  });

  if (module.hot) {
    module.hot.accept('./app.module', () => {
      console.log('reloading...');
    });
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
