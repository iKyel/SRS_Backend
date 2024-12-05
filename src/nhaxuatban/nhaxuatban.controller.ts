import { Controller, Get, Post, Body, Param, Put, Delete, Patch } from '@nestjs/common';
import { NhaxuatbanService } from './nhaxuatban.service';
import { CreateNhaxuatbanDto } from './dto/create-nhaxuatban.dto';
import { UpdateNhaxuatbanDto } from './dto/update-nhaxuatban.dto';

@Controller('nhaxuatban')
export class NhaxuatbanController {
  constructor(private readonly nhaxuatbanService: NhaxuatbanService) {}

  @Post()
  create(@Body() createNhaxuatbanDto: CreateNhaxuatbanDto) {
    return this.nhaxuatbanService.create(createNhaxuatbanDto);
  }

  @Get()
  findAll() {
    return this.nhaxuatbanService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.nhaxuatbanService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateNhaxuatbanDto: UpdateNhaxuatbanDto) {
    return this.nhaxuatbanService.update(id, updateNhaxuatbanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.nhaxuatbanService.remove(id);
  }
}
