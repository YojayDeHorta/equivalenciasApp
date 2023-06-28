import { Module } from '@nestjs/common';
import { ConverterModule } from './converter/converter.module';
import { MonedasModule } from './monedas/monedas.module';

@Module({
  imports: [ConverterModule, MonedasModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
