// phieunhapkho.service.ts
import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PhieuNhapKho } from './entities/phieunhapkho.entity';
import { CreatePhieunhapkhoDto } from './dto/create-phieunhapkho.dto';
import { Taikhoan } from 'src/taikhoan/entities/taikhoan.entity';

@Injectable()
export class PhieunhapkhoService {
  constructor(
    @InjectRepository(PhieuNhapKho)
    private readonly phieuNhapKhoRepository: Repository<PhieuNhapKho>,

    @InjectRepository(Taikhoan)
    private readonly taikhoanRepository: Repository<Taikhoan>, // Để tìm kiếm nhân viên và đại lý
  ) {}

  // Kiểm tra vai trò của tài khoản
  private async checkRole(tentk: string, roles: string[]): Promise<void> {
    const user = await this.taikhoanRepository.findOne({ where: { tentk } });
    if (!user) {
      throw new NotFoundException('Tài khoản không tồn tại');
    }
    if (!roles.includes(user.vaitro)) {
      throw new ForbiddenException('Bạn không có quyền thực hiện hành động này');
    }
  }

  // Tạo mới phiếu nhập kho
  async create(createPhieunhapkhoDto: CreatePhieunhapkhoDto): Promise<PhieuNhapKho> {
    const { nhanvien, daily, trangthai, tongtien } = createPhieunhapkhoDto;

    // Kiểm tra vai trò của nhân viên (phải là NV) và đại lý (phải là DL nếu có)
    await this.checkRole(nhanvien, ['NV']);
    if (daily) {
      await this.checkRole(daily, ['DL']);
    }

    // Tìm nhân viên và đại lý từ tên tài khoản
    const nhanVienEntity = await this.taikhoanRepository.findOne({ where: { tentk: nhanvien } });
    if (!nhanVienEntity) {
      throw new NotFoundException('Nhân viên không tồn tại');
    }

    let dailyEntity: Taikhoan = null;
    if (daily) {
      dailyEntity = await this.taikhoanRepository.findOne({ where: { tentk: daily } });
      if (!dailyEntity) {
        throw new NotFoundException('Đại lý không tồn tại');
      }
    }

    // Tạo mới phiếu nhập kho
    const phieuNhapKho = this.phieuNhapKhoRepository.create({
      ten_nv: nhanvien,
      ten_daily: daily || null,
      trangthai,
      tongtien,
      nhanvien: nhanVienEntity,
      daily: dailyEntity,
    });

    return this.phieuNhapKhoRepository.save(phieuNhapKho);
  }

  // Lấy danh sách phiếu nhập kho
  async findAll(): Promise<PhieuNhapKho[]> {
    return this.phieuNhapKhoRepository.find({
      relations: ['nhanvien', 'daily'], // Lấy thêm thông tin nhân viên và đại lý
    });
  }

  // Lấy phiếu nhập kho theo ID
  async findOne(id: number): Promise<PhieuNhapKho> {
    const phieuNhapKho = await this.phieuNhapKhoRepository.findOne({
      where: { id },
      relations: ['nhanvien', 'daily'], // Lấy thêm thông tin nhân viên và đại lý
    });
    if (!phieuNhapKho) {
      throw new NotFoundException('Phiếu nhập kho không tồn tại');
    }
    return phieuNhapKho;
  }

  // Cập nhật phiếu nhập kho
  async update(id: number, updateData: Partial<CreatePhieunhapkhoDto>): Promise<PhieuNhapKho> {
    const phieuNhapKho = await this.findOne(id);

    // Kiểm tra vai trò của người dùng (nhân viên hoặc đại lý)
    if (updateData.nhanvien) {
      await this.checkRole(updateData.nhanvien, ['NV']);
    }
    if (updateData.daily) {
      await this.checkRole(updateData.daily, ['DL']);
    }

    // Cập nhật các thuộc tính của phiếu nhập kho
    Object.assign(phieuNhapKho, updateData);

    return this.phieuNhapKhoRepository.save(phieuNhapKho);
  }

  // Xóa phiếu nhập kho
  async remove(id: number): Promise<void> {
    const phieuNhapKho = await this.findOne(id);
    await this.phieuNhapKhoRepository.remove(phieuNhapKho);
  }
}
