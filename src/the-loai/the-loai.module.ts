import { Module } from '@nestjs/common';
import { TheLoaiService } from './the-loai.service';
import { TheLoaiController } from './the-loai.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TheLoai } from './entities/the-loai.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TheLoai])], 
  controllers: [TheLoaiController],
  providers: [TheLoaiService],
})
export class TheLoaiModule {}
