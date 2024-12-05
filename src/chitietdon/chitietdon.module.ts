import { Module } from '@nestjs/common';
import { ChitietdonService } from './chitietdon.service';
import { ChitietdonController } from './chitietdon.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chitietdon } from './entities/chitietdon.entity';
import { Don } from 'src/don/entities/don.entity';
import { Sach } from 'src/sach/entities/sach.entity';
import { SachService } from 'src/sach/sach.service';
import { DonService } from 'src/don/don.service';
import { TacGia } from 'src/tacgia/entities/tacgia.entity';
import { TacgiaService } from 'src/tacgia/tacgia.service';
import { TheLoaiService } from 'src/the-loai/the-loai.service';
import { NhaxuatbanService } from 'src/nhaxuatban/nhaxuatban.service';
import { Taikhoan } from 'src/taikhoan/entities/taikhoan.entity';
import { NhaXuatBan } from 'src/nhaxuatban/entities/nhaxuatban.entity';
import { TheLoai } from 'src/the-loai/entities/the-loai.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Chitietdon, Don, Sach, Taikhoan, TacGia, NhaXuatBan, TheLoai])],
  controllers: [ChitietdonController],
  providers: [ChitietdonService, SachService, DonService, TacgiaService, TheLoaiService, NhaxuatbanService],
})
export class ChitietdonModule {}
