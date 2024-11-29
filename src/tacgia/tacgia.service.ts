import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTacgiaDto } from './dto/create-tacgia.dto';
import { UpdateTacgiaDto } from './dto/update-tacgia.dto';
import { TacGia } from './entities/tacgia.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TacgiaService {
  constructor(
    @InjectRepository(TacGia)
    private readonly tacgiaRepository: Repository<TacGia>,
  ) {}

  // Tao tac gia moi
  async create(createTacgiaDto: CreateTacgiaDto): Promise<TacGia> {
    if (!createTacgiaDto.tieu_su) {
      createTacgiaDto.tieu_su = 'không có tiểu sử'; // Gán giá trị mặc định
    }
    const newTacgia = this.tacgiaRepository.create(createTacgiaDto);
    return await this.tacgiaRepository.save(newTacgia);
  }

  // Tim tat ca tac gia
  async findAll(): Promise<TacGia[]> {
    return await this.tacgiaRepository.find();
  }

  async findOne(id: number): Promise<TacGia> {
    const tacGia = await this.tacgiaRepository.findOne({ where: { id } }); // Thêm 'await'
    if (!tacGia) {
      throw new NotFoundException(`Tác giả với ID ${id} không tồn tại`);
    }
    return tacGia;
  }
  

  // Cap nhat 1 tac gia
  async update(id: number, updateTacgiaDto: UpdateTacgiaDto): Promise<TacGia> {
    const tacGia = await this.findOne(id);
    Object.assign(tacGia, updateTacgiaDto);
    return await this.tacgiaRepository.save(tacGia)
  }

  // Xoa 1 tac gia
  async remove(id: number): Promise<TacGia> {
    const tacGia = await this.findOne(id);
    return await this.tacgiaRepository.remove(tacGia)
  }
}
