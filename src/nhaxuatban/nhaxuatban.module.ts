import { Module } from '@nestjs/common';
import { NhaxuatbanService } from './nhaxuatban.service';
import { NhaxuatbanController } from './nhaxuatban.controller';
import { NhaXuatBan } from './entities/nhaxuatban.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sach } from 'src/sach/entities/sach.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NhaXuatBan, Sach])],
  controllers: [NhaxuatbanController],
  providers: [NhaxuatbanService],
})
export class NhaxuatbanModule {}
