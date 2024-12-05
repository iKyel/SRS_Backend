import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PhieunhapkhoService } from './phieunhapkho.service';
import { CreatePhieunhapkhoDto } from './dto/create-phieunhapkho.dto';
import { UpdatePhieunhapkhoDto } from './dto/update-phieunhapkho.dto';

@Controller('phieunhapkho')
export class PhieunhapkhoController {
  constructor(private readonly phieunhapkhoService: PhieunhapkhoService) {}

  @Post()
  create(@Body() createPhieunhapkhoDto: CreatePhieunhapkhoDto) {
    return this.phieunhapkhoService.create(createPhieunhapkhoDto);
  }

  @Get()
  findAll() {
    return this.phieunhapkhoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.phieunhapkhoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePhieunhapkhoDto: UpdatePhieunhapkhoDto) {
    return this.phieunhapkhoService.update(+id, updatePhieunhapkhoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.phieunhapkhoService.remove(+id);
  }
}
