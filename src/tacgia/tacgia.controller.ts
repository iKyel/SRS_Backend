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
import { TacgiaService } from './tacgia.service';
import { CreateTacgiaDto } from './dto/create-tacgia.dto';
import { UpdateTacgiaDto } from './dto/update-tacgia.dto';

@Controller('tac-gia')
export class TacgiaController {
  constructor(private readonly tacgiaService: TacgiaService) {}

  @Post()
  async create(@Body() createTacGiaDto: CreateTacgiaDto) {
    return this.tacgiaService.create(createTacGiaDto);
  }

  @Get()
  async findAll() {
    return await this.tacgiaService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.tacgiaService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTacGiaDto: UpdateTacgiaDto,
  ) {
    return await this.tacgiaService.update(id, updateTacGiaDto);
  }
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.tacgiaService.remove(id);
  }
}
