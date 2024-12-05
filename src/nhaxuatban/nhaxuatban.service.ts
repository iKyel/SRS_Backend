import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNhaxuatbanDto } from './dto/create-nhaxuatban.dto';
import { UpdateNhaxuatbanDto } from './dto/update-nhaxuatban.dto';
import { NhaXuatBan } from './entities/nhaxuatban.entity';  // Import entity

@Injectable()
export class NhaxuatbanService {
  constructor(
    @InjectRepository(NhaXuatBan)
    private readonly nhaxuatbanRepository: Repository<NhaXuatBan>,
  ) {}

  // Tạo mới nhà xuất bản
  async create(createNhaxuatbanDto: CreateNhaxuatbanDto): Promise<NhaXuatBan> {
    const newNhaxuatban = this.nhaxuatbanRepository.create(createNhaxuatbanDto);
    return await this.nhaxuatbanRepository.save(newNhaxuatban);
  }

  // Lấy tất cả nhà xuất bản
  async findAll(): Promise<NhaXuatBan[]> {
    return await this.nhaxuatbanRepository.find();
  }

  // Lấy thông tin chi tiết một nhà xuất bản
  async findOne(id: number): Promise<NhaXuatBan> {
    const nhaxuatban = await this.nhaxuatbanRepository.findOne({ where: { id } });
    if (!nhaxuatban) {
      throw new NotFoundException(`Nhà xuất bản với ID ${id} không tồn tại`);
    }
    return nhaxuatban;
  }

  // Cập nhật thông tin nhà xuất bản
  async update(id: number, updateNhaxuatbanDto: UpdateNhaxuatbanDto): Promise<NhaXuatBan> {
    const nhaxuatban = await this.findOne(id); // Kiểm tra nếu nhà xuất bản có tồn tại
    Object.assign(nhaxuatban, updateNhaxuatbanDto); // Cập nhật các thuộc tính
    return await this.nhaxuatbanRepository.save(nhaxuatban); // Lưu vào DB
  }

  // Xóa nhà xuất bản
  async remove(id: number): Promise<void> {
    const nhaxuatban = await this.findOne(id); // Kiểm tra nếu nhà xuất bản có tồn tại
    await this.nhaxuatbanRepository.remove(nhaxuatban); // Xóa nhà xuất bản
  }
}
