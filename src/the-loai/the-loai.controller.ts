import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { TheLoaiService } from './the-loai.service';
import { CreateTheLoaiDto } from './dto/create-the-loai.dto';
import { UpdateTheLoaiDto } from './dto/update-the-loai.dto';

@Controller('the-loai')
export class TheLoaiController {
  constructor(private readonly theLoaiService: TheLoaiService) {}

  @Post()
  async create(@Body() createTheLoaiDto: CreateTheLoaiDto) {
    return this.theLoaiService.create(createTheLoaiDto);
  }

  @Get()
  async findAll() {
    return this.theLoaiService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.theLoaiService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTheLoaiDto: UpdateTheLoaiDto,
  ) {
    return this.theLoaiService.update(id, updateTheLoaiDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.theLoaiService.remove(id);
  }
}
