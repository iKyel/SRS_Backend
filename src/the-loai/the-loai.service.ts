import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTheLoaiDto } from './dto/create-the-loai.dto';
import { UpdateTheLoaiDto } from './dto/update-the-loai.dto';
import { TheLoai } from './entities/the-loai.entity';

@Injectable()
export class TheLoaiService {
  constructor(
    @InjectRepository(TheLoai)
    private readonly theLoaiRepository: Repository<TheLoai>, // Repository for TheLoai
  ) {}

  // Tạo một thể loại mới
  async create(createTheLoaiDto: CreateTheLoaiDto): Promise<TheLoai> {
    const newTheLoai = this.theLoaiRepository.create(createTheLoaiDto);
    return await this.theLoaiRepository.save(newTheLoai);
  }

  // Lấy danh sách tất cả thể loại
  async findAll(): Promise<TheLoai[]> {
    return await this.theLoaiRepository.find({
      relations: {
        sachs: true,
      },
    });
  }

  // Lấy chi tiết một thể loại theo ID
  async findOne(id: number): Promise<TheLoai> {
    const theLoai = await this.theLoaiRepository.findOne({ where: { id } });
    if (!theLoai) {
      throw new NotFoundException(`Thể loại với ID ${id} không tồn tại`);
    }
    return theLoai;
  }

  // Cập nhật thông tin một thể loại
  async update(
    id: number,
    updateTheLoaiDto: UpdateTheLoaiDto,
  ): Promise<TheLoai> {
    const theLoai = await this.findOne(id);
    Object.assign(theLoai, updateTheLoaiDto); // Cập nhật thông tin từ DTO
    return await this.theLoaiRepository.save(theLoai);
  }

  // Xóa một thể loại
  async remove(id: number): Promise<void> {
    const theLoai = await this.findOne(id);
    await this.theLoaiRepository.remove(theLoai);
  }
}
