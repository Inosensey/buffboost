// Buffs.module.ts
import { Module } from '@nestjs/common';
import { BuffController } from './buff.controller';
import { BuffService } from './buff.service';

@Module({
  controllers: [BuffController],
  providers: [BuffService],
  exports: [BuffService],
})
export class BuffModule {}
