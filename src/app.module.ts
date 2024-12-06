import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TheLoai } from './the-loai/entities/the-loai.entity';
import { TheLoaiModule } from './the-loai/the-loai.module';
import { TacgiaModule } from './tacgia/tacgia.module';
import { NhaxuatbanModule } from './nhaxuatban/nhaxuatban.module';
import { SachModule } from './sach/sach.module';
import { Sach } from './sach/entities/sach.entity';
import { TacGia } from './tacgia/entities/tacgia.entity';
import { NhaXuatBan } from './nhaxuatban/entities/nhaxuatban.entity';
import { TaikhoanModule } from './taikhoan/taikhoan.module';
import { Taikhoan } from './taikhoan/entities/taikhoan.entity';
import { DonModule } from './don/don.module';
import { ChitietdonModule } from './chitietdon/chitietdon.module';
import { PhieunhapkhoModule } from './phieunhapkho/phieunhapkho.module';
import { ChitietpnkModule } from './chitietpnk/chitietpnk.module';
import { NhanbanModule } from './nhanban/nhanban.module';
@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'bookstoresrs_db',
      autoLoadEntities: true,
      synchronize: false
    }),
    TheLoaiModule,
    TacgiaModule,
    NhaxuatbanModule,
    SachModule,
    TaikhoanModule,
    DonModule,
    ChitietdonModule,
    PhieunhapkhoModule,
    ChitietpnkModule,
    NhanbanModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
