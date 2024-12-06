import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NhanbanService } from './nhanban.service';
import { CreateNhanbanDto } from './dto/create-nhanban.dto';
import { UpdateNhanbanDto } from './dto/update-nhanban.dto';

@Controller('nhanban')
export class NhanbanController {
  constructor(private readonly nhanbanService: NhanbanService) {}

  @Post()
  create(@Body() createNhanbanDto: CreateNhanbanDto) {
    return this.nhanbanService.create(createNhanbanDto);
  }

  @Get()
  findAll() {
    return this.nhanbanService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.nhanbanService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNhanbanDto: UpdateNhanbanDto) {
    return this.nhanbanService.update(+id, updateNhanbanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.nhanbanService.remove(+id);
  }
}
