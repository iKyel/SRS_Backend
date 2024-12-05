import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TaikhoanService } from './taikhoan.service';
import { CreateTaikhoanDto } from './dto/create-taikhoan.dto';
import { UpdateTaikhoanDto } from './dto/update-taikhoan.dto';

@Controller('taikhoan')
export class TaikhoanController {
  constructor(private readonly taikhoanService: TaikhoanService) {}

  @Post()
  create(@Body() createTaikhoanDto: CreateTaikhoanDto) {
    return this.taikhoanService.create(createTaikhoanDto);
  }

  @Get()
  findAll() {
    return this.taikhoanService.findAll();
  }

  // Lấy tài khoản theo tên tài khoản (tentk)
  @Get(':tentk')
  findOne(@Param('tentk') tentk: string) {
    return this.taikhoanService.findOne(tentk);
  }

  // Cập nhật tài khoản theo tên tài khoản (tentk)
  @Patch(':tentk')
  update(@Param('tentk') tentk: string, @Body() updateTaikhoanDto: UpdateTaikhoanDto) {
    return this.taikhoanService.update(tentk, updateTaikhoanDto);
  }

  // Xóa tài khoản theo tên tài khoản (tentk)
  @Delete(':tentk')
  remove(@Param('tentk') tentk: string) {
    return this.taikhoanService.remove(tentk);
  }
}
