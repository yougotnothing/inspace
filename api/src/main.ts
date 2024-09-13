import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    methods: 'GET,POST,PUT,PATCH,DELETE,HEAD',
    allowedHeaders: '*',
    credentials: true,
  });

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
