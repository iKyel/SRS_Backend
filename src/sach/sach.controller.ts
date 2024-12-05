import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { SachService } from './sach.service';
import { CreateSachDto } from './dto/create-sach.dto';
import { UpdateSachDto } from './dto/update-sach.dto';
import { Sach } from './entities/sach.entity';

@Controller('sach')
export class SachController {
  constructor(private readonly sachService: SachService) {}

  // Tạo sách mới
  @Post()
  async create(@Body() createSachDto: CreateSachDto): Promise<Sach> {
    return this.sachService.create(createSachDto);
  }

  // Lấy tất cả sách
  @Get()
  async findAll(): Promise<Sach[]> {
    return this.sachService.findAll();
  }

  // Lấy một sách theo ID
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Sach> {
    return this.sachService.findOne(id);
  }

  // Cập nhật sách
  @Put(':id')
  async update(@Param('id') id: number, @Body() updateSachDto: UpdateSachDto): Promise<Sach> {
    return this.sachService.update(id, updateSachDto);
  }

  // Xóa sách
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.sachService.remove(id);
  }
}
