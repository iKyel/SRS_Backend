import { Module } from '@nestjs/common';
import { TaikhoanService } from './taikhoan.service';
import { TaikhoanController } from './taikhoan.controller';
import { Taikhoan } from './entities/taikhoan.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Don } from 'src/don/entities/don.entity';
import { PhieuNhapKho } from 'src/phieunhapkho/entities/phieunhapkho.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Taikhoan, Don, PhieuNhapKho])],
  controllers: [TaikhoanController],
  providers: [TaikhoanService],
})
export class TaikhoanModule {}
