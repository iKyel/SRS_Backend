import { Module } from '@nestjs/common';
import { SachService } from './sach.service';
import { SachController } from './sach.controller';
import { Sach } from './entities/sach.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TheLoai } from 'src/the-loai/entities/the-loai.entity';
import { TacGia } from 'src/tacgia/entities/tacgia.entity';
import { NhaXuatBan } from 'src/nhaxuatban/entities/nhaxuatban.entity';
import { TacgiaService } from 'src/tacgia/tacgia.service';
import { TheLoaiService } from 'src/the-loai/the-loai.service';
import { NhaxuatbanService } from 'src/nhaxuatban/nhaxuatban.service';
import { Chitietdon } from 'src/chitietdon/entities/chitietdon.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sach, TheLoai, TacGia, NhaXuatBan, Chitietdon])],
  controllers: [SachController],
  providers: [SachService, TacgiaService, TheLoaiService, NhaxuatbanService],
})
export class SachModule {}
