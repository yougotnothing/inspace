import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { NestExpressApplication } from '@nestjs/platform-express';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(cookieParser());
  app.use(
    cors({
      origin: 'http://localhost:5173',
      credentials: true,
    })
  );

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
