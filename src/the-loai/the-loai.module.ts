import { Module } from '@nestjs/common';
import { TheLoaiService } from './the-loai.service';
import { TheLoaiController } from './the-loai.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TheLoai } from './entities/the-loai.entity';
import { Sach } from 'src/sach/entities/sach.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TheLoai, Sach])], 
  controllers: [TheLoaiController],
  providers: [TheLoaiService],
})
export class TheLoaiModule {}
