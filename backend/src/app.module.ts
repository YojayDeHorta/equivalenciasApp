import { Module } from '@nestjs/common';
import { LongitudModule } from './longitud/longitud.module';

@Module({
  imports: [LongitudModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
