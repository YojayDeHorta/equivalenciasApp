import { Module } from '@nestjs/common';
import { LongitudModule } from './longitud/longitud.module';
import { MonedasModule } from './monedas/monedas.module';

@Module({
  imports: [LongitudModule, MonedasModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
