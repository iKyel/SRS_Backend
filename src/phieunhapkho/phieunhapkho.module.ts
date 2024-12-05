import { Module } from '@nestjs/common';
import { PhieunhapkhoService } from './phieunhapkho.service';
import { PhieunhapkhoController } from './phieunhapkho.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhieuNhapKho } from './entities/phieunhapkho.entity';
import { Taikhoan } from 'src/taikhoan/entities/taikhoan.entity';
import { TaikhoanService } from 'src/taikhoan/taikhoan.service';

@Module({
  imports: [TypeOrmModule.forFeature([PhieuNhapKho, Taikhoan])],
  controllers: [PhieunhapkhoController],
  providers: [PhieunhapkhoService, TaikhoanService],
})
export class PhieunhapkhoModule {}
