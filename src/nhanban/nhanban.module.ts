import { Module } from '@nestjs/common';
import { NhanbanService } from './nhanban.service';
import { NhanbanController } from './nhanban.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NhanBan } from './entities/nhanban.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NhanBan]),],
  controllers: [NhanbanController],
  providers: [NhanbanService],
})
export class NhanbanModule {}
