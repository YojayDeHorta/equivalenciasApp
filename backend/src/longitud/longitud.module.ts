import { Module } from '@nestjs/common';
import { LongitudController } from './longitud.controller';
import { LongitudService } from './longitud.service';

@Module({
  controllers: [LongitudController],
  providers: [LongitudService]
})
export class LongitudModule {}
