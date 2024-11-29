import { Module } from '@nestjs/common';
import { TacgiaService } from './tacgia.service';
import { TacgiaController } from './tacgia.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TacGia } from './entities/tacgia.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TacGia])],
  controllers: [TacgiaController],
  providers: [TacgiaService],
})
export class TacgiaModule {}
