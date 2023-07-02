import { Module } from '@nestjs/common';
import { ConverterModule } from './converter/converter.module';
import { MonedasModule } from './monedas/monedas.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }),
    ConverterModule, MonedasModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'front'),   // <-- path to the static files
    }),],
  controllers: [],
  providers: [],
})
export class AppModule {}
