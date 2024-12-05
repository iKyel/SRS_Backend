import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaikhoanDto } from './dto/create-taikhoan.dto';
import { UpdateTaikhoanDto } from './dto/update-taikhoan.dto';
import { Taikhoan } from './entities/taikhoan.entity';

@Injectable()
export class TaikhoanService {
  constructor(
    @InjectRepository(Taikhoan)
    private readonly taikhoanRepository: Repository<Taikhoan>, // Repository của bảng tài khoản
  ) {}

  // Thêm tài khoản mới
  async create(createTaikhoanDto: CreateTaikhoanDto): Promise<Taikhoan> {
    const newTaikhoan = this.taikhoanRepository.create(createTaikhoanDto); // Tạo đối tượng tài khoản
    return await this.taikhoanRepository.save(newTaikhoan); // Lưu vào cơ sở dữ liệu
  }

  // Lấy tất cả tài khoản
  async findAll(): Promise<Taikhoan[]> {
    return await this.taikhoanRepository.find(); // Lấy toàn bộ danh sách tài khoản
  }

  // Lấy tài khoản theo tên tài khoản (tentk)
  async findOne(tentk: string): Promise<Taikhoan> {
    const taikhoan = await this.taikhoanRepository.findOne({ where: { tentk } }); // Tìm tài khoản theo tentk
    if (!taikhoan) {
      throw new NotFoundException(`Tài khoản với tên tài khoản ${tentk} không tồn tại`);
    }
    return taikhoan;
  }

  // Cập nhật tài khoản
  async update(
    tentk: string,
    updateTaikhoanDto: UpdateTaikhoanDto,
  ): Promise<Taikhoan> {
    const taikhoan = await this.findOne(tentk); // Kiểm tra tài khoản tồn tại
    Object.assign(taikhoan, updateTaikhoanDto); // Gán các giá trị từ DTO
    return await this.taikhoanRepository.save(taikhoan); // Lưu lại sau khi cập nhật
  }

  // Xóa tài khoản
  async remove(tentk: string): Promise<void> {
    const taikhoan = await this.findOne(tentk); // Kiểm tra tài khoản tồn tại
    await this.taikhoanRepository.remove(taikhoan); // Xóa tài khoản khỏi cơ sở dữ liệu
  }
}
