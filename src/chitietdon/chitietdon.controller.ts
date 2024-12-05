import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ChitietdonService } from './chitietdon.service';
import { CreateChitietdonDto } from './dto/create-chitietdon.dto';
import { UpdateChitietdonDto } from './dto/update-chitietdon.dto';

@Controller('chitietdon')
export class ChitietdonController {
  constructor(private readonly chitietdonService: ChitietdonService) {}

  @Post()
  create(@Body() createChitietdonDto: CreateChitietdonDto) {
    return this.chitietdonService.create(createChitietdonDto);
  }

  @Get()
  findAll() {
    return this.chitietdonService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chitietdonService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChitietdonDto: UpdateChitietdonDto) {
    return this.chitietdonService.update(+id, updateChitietdonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chitietdonService.remove(+id);
  }
}
