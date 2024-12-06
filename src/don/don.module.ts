import { Module } from '@nestjs/common';
import { DonService } from './don.service';
import { DonController } from './don.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Don } from './entities/don.entity';
import { Chitietdon } from 'src/chitietdon/entities/chitietdon.entity';
import { TaikhoanService } from 'src/taikhoan/taikhoan.service';
import { Taikhoan } from 'src/taikhoan/entities/taikhoan.entity';
import { ChitietdonService } from 'src/chitietdon/chitietdon.service';
import { Sach } from 'src/sach/entities/sach.entity';
import { SachService } from 'src/sach/sach.service';
import { TacgiaService } from 'src/tacgia/tacgia.service';
import { TheLoaiService } from 'src/the-loai/the-loai.service';
import { NhaxuatbanService } from 'src/nhaxuatban/nhaxuatban.service';
import { TacGia } from 'src/tacgia/entities/tacgia.entity';
import { TheLoai } from 'src/the-loai/entities/the-loai.entity';
import { NhaXuatBan } from 'src/nhaxuatban/entities/nhaxuatban.entity';
import { NhanBan } from 'src/nhanban/entities/nhanban.entity';
import { NhanbanService } from 'src/nhanban/nhanban.service';

@Module({
  imports: [TypeOrmModule.forFeature([Don, Taikhoan, Chitietdon, Sach, TacGia, TheLoai, NhaXuatBan, NhanBan]),],
  controllers: [DonController],
  providers: [DonService, TaikhoanService, ChitietdonService, SachService, TacgiaService, TheLoaiService, NhaxuatbanService, NhanbanService],
})
export class DonModule {}
