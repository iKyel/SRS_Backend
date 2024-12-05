import { Module } from '@nestjs/common';
import { TacgiaService } from './tacgia.service';
import { TacgiaController } from './tacgia.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TacGia } from './entities/tacgia.entity';
import { Sach } from 'src/sach/entities/sach.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TacGia, Sach])],
  controllers: [TacgiaController],
  providers: [TacgiaService],
})
export class TacgiaModule {}
