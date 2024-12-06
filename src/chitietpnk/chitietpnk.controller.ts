import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ChitietpnkService } from './chitietpnk.service';
import { CreateChitietpnkDto } from './dto/create-chitietpnk.dto';
import { UpdateChitietpnkDto } from './dto/update-chitietpnk.dto';

@Controller('chitietpnk')
export class ChitietpnkController {
  constructor(private readonly chitietpnkService: ChitietpnkService) {}

  @Post()
  create(@Body() createChitietpnkDto: CreateChitietpnkDto) {
    return this.chitietpnkService.create(createChitietpnkDto);
  }

  @Get()
  findAll() {
    return this.chitietpnkService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chitietpnkService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChitietpnkDto: UpdateChitietpnkDto) {
    return this.chitietpnkService.update(+id, updateChitietpnkDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chitietpnkService.remove(+id);
  }
}
