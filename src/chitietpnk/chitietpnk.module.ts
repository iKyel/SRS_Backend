import { Module } from '@nestjs/common';
import { ChitietpnkService } from './chitietpnk.service';
import { ChitietpnkController } from './chitietpnk.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chitietpnk } from './entities/chitietpnk.entity';
import { PhieuNhapKho } from 'src/phieunhapkho/entities/phieunhapkho.entity';
import { Taikhoan } from 'src/taikhoan/entities/taikhoan.entity';
import { Sach } from 'src/sach/entities/sach.entity';
import { TheLoai } from 'src/the-loai/entities/the-loai.entity';
import { TacGia } from 'src/tacgia/entities/tacgia.entity';
import { NhaXuatBan } from 'src/nhaxuatban/entities/nhaxuatban.entity';
import { NhanBan } from 'src/nhanban/entities/nhanban.entity';
import { PhieunhapkhoService } from 'src/phieunhapkho/phieunhapkho.service';
import { SachService } from 'src/sach/sach.service';
import { TacgiaService } from 'src/tacgia/tacgia.service';
import { TheLoaiService } from 'src/the-loai/the-loai.service';
import { NhaxuatbanService } from 'src/nhaxuatban/nhaxuatban.service';

@Module({
  imports: [TypeOrmModule.forFeature([Chitietpnk, PhieuNhapKho, Taikhoan, Sach, TheLoai, TacGia, NhaXuatBan, NhanBan]),],
  controllers: [ChitietpnkController],
  providers: [ChitietpnkService, PhieunhapkhoService, SachService, TacgiaService, TheLoaiService, NhaxuatbanService],
})
export class ChitietpnkModule {}
