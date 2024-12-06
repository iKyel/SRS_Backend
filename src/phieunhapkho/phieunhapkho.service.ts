import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PhieuNhapKho } from './entities/phieunhapkho.entity';
import { CreatePhieunhapkhoDto } from './dto/create-phieunhapkho.dto';
import { UpdatePhieunhapkhoDto } from './dto/update-phieunhapkho.dto';
import { Taikhoan } from 'src/taikhoan/entities/taikhoan.entity';

@Injectable()
export class PhieunhapkhoService {
  constructor(
    @InjectRepository(PhieuNhapKho)
    private readonly phieuNhapKhoRepository: Repository<PhieuNhapKho>,

    @InjectRepository(Taikhoan)
    private readonly taikhoanRepository: Repository<Taikhoan>,
  ) {}

  async create(dto: CreatePhieunhapkhoDto): Promise<PhieuNhapKho> {
    const { nhanvien, daily, tongtien, trangthai } = dto;

    // Kiểm tra tài khoản nhân viên
    const nhanVienEntity = await this.taikhoanRepository.findOne({
      where: { tentk: nhanvien, vaitro: 'NV' },
    });
    if (!nhanVienEntity) {
      throw new BadRequestException('Tài khoản nhân viên không hợp lệ.');
    }

    // Kiểm tra tài khoản đại lý (nếu có)
    let daiLyEntity = null;
    if (daily) {
      daiLyEntity = await this.taikhoanRepository.findOne({
        where: { tentk: daily, vaitro: 'DL' },
      });
      if (!daiLyEntity) {
        throw new BadRequestException('Tài khoản đại lý không hợp lệ.');
      }
    }

    // Tạo phiếu nhập kho mới
    const phieuNhapKho = this.phieuNhapKhoRepository.create({
      nhanvien: nhanVienEntity,
      daily: daiLyEntity,
      tongtien: tongtien ?? 0, // Nếu không có giá trị, mặc định là 0
      trangthai: trangthai ?? 'ChoDuyet', // Nếu không có giá trị, mặc định là 'ChoDuyet'
    });

    return this.phieuNhapKhoRepository.save(phieuNhapKho);
  }

  // Lấy danh sách tất cả phiếu nhập kho
  async findAll(): Promise<PhieuNhapKho[]> {
    return this.phieuNhapKhoRepository.find({
      relations: ['nhanvien', 'daily'], // Lấy thông tin liên kết
    });
  }

  // Lấy thông tin một phiếu nhập kho theo ID
  async findOne(id: number): Promise<PhieuNhapKho> {
    const phieuNhapKho = await this.phieuNhapKhoRepository.findOne({
      where: { id },
      relations: ['nhanvien', 'daily'], // Lấy thông tin liên kết
    });
    if (!phieuNhapKho) {
      throw new NotFoundException(`Phiếu nhập kho với ID ${id} không tồn tại.`);
    }
    return phieuNhapKho;
  }

  // Cập nhật thông tin phiếu nhập kho
  async update(id: number, updatePhieunhapkhoDto: UpdatePhieunhapkhoDto): Promise<PhieuNhapKho> {
    const phieuNhapKho = await this.findOne(id);

    // Cập nhật thông tin
    if (updatePhieunhapkhoDto.nhanvien) {
      const nhanVienEntity = await this.taikhoanRepository.findOne({
        where: { tentk: updatePhieunhapkhoDto.nhanvien, vaitro: 'NV' },
      });
      if (!nhanVienEntity) {
        throw new BadRequestException('Nhân viên không tồn tại hoặc vai trò không hợp lệ.');
      }
      phieuNhapKho.nhanvien = nhanVienEntity;
    }

    if (updatePhieunhapkhoDto.daily) {
      const daiLyEntity = await this.taikhoanRepository.findOne({
        where: { tentk: updatePhieunhapkhoDto.daily, vaitro: 'DL' },
      });
      if (!daiLyEntity) {
        throw new BadRequestException('Đại lý không tồn tại hoặc vai trò không hợp lệ.');
      }
      phieuNhapKho.daily = daiLyEntity;
    }

    if (updatePhieunhapkhoDto.tongtien !== undefined) {
      phieuNhapKho.tongtien = updatePhieunhapkhoDto.tongtien;
    }

    if (updatePhieunhapkhoDto.trangthai) {
      phieuNhapKho.trangthai = updatePhieunhapkhoDto.trangthai;
    }

    return this.phieuNhapKhoRepository.save(phieuNhapKho);
  }

  // Xóa một phiếu nhập kho theo ID
  async remove(id: number): Promise<void> {
    const phieuNhapKho = await this.findOne(id);
    await this.phieuNhapKhoRepository.remove(phieuNhapKho);
  }
}
