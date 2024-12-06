import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNhanbanDto } from './dto/create-nhanban.dto';
import { UpdateNhanbanDto } from './dto/update-nhanban.dto';
import { NhanBan } from './entities/nhanban.entity'; // Đảm bảo rằng bạn đã import entity NhanBan

@Injectable()
export class NhanbanService {
  constructor(
    @InjectRepository(NhanBan)
    private readonly nhanbanRepository: Repository<NhanBan>, // Sử dụng repository để thao tác với entity
  ) {}

  // Tạo mới một nhân bản
  async create(createNhanbanDto: CreateNhanbanDto): Promise<NhanBan> {
    const nhanban = this.nhanbanRepository.create(createNhanbanDto); // Tạo một entity mới từ DTO
    return await this.nhanbanRepository.save(nhanban); // Lưu entity vào cơ sở dữ liệu
  }

  // Lấy tất cả các nhân bản
  async findAll(): Promise<NhanBan[]> {
    return await this.nhanbanRepository.find({
      relations: ['sach', 'chitietpnk', 'chitietdon'],
    }); // Trả về tất cả các nhân bản
  }

  // Lấy một nhân bản theo ID
  async findOne(id: number): Promise<NhanBan> {
    return await this.nhanbanRepository.findOne({
      where: { id }, // Tìm kiếm dựa trên ID
      relations: ['sach', 'chitietpnk', 'chitietdon'], // Nếu cần load các quan hệ (relations)
    });
  }

  // Cập nhật một nhân bản
  async update(
    id: number,
    updateNhanbanDto: UpdateNhanbanDto,
  ): Promise<NhanBan> {
    const nhanban = await this.nhanbanRepository.preload({
      id, // Lấy bản ghi có ID tương ứng
      ...updateNhanbanDto, // Cập nhật thông tin từ DTO
    });

    if (!nhanban) {
      throw new Error(`NhanBan with ID ${id} not found`); // Nếu không tìm thấy nhân bản
    }

    return await this.nhanbanRepository.save(nhanban); // Lưu thông tin đã cập nhật
  }

  // Xóa một nhân bản
  async remove(id: number): Promise<void> {
    const nhanban = await this.findOne(id);
    if (!nhanban) {
      throw new Error(`NhanBan with ID ${id} not found`);
    }

    await this.nhanbanRepository.remove(nhanban); // Xóa nhân bản
  }
}
