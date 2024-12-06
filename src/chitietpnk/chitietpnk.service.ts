import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chitietpnk } from './entities/chitietpnk.entity';
import { CreateChitietpnkDto } from './dto/create-chitietpnk.dto';
import { UpdateChitietpnkDto } from './dto/update-chitietpnk.dto';
import { Sach } from 'src/sach/entities/sach.entity';
import { PhieuNhapKho } from 'src/phieunhapkho/entities/phieunhapkho.entity';

@Injectable()
export class ChitietpnkService {
  constructor(
    @InjectRepository(Chitietpnk)
    private readonly chitietpnkRepository: Repository<Chitietpnk>,
    @InjectRepository(Sach)
    private readonly sachRepository: Repository<Sach>,
    @InjectRepository(PhieuNhapKho)
    private readonly phieuNhapKhoRepository: Repository<PhieuNhapKho>,
  ) {}

  // Hàm tính tổng tiền của phiếu nhập kho
  private async calculateTotalAmount(phieuNhapKhoId: number): Promise<number> {
    // Lấy danh sách các chi tiết phiếu nhập kho của phiếu nhập kho
    const chitietpnkList = await this.chitietpnkRepository.find({
      where: { phieuNhapKhoId },
      relations: ['sach'], // Load thông tin sách để lấy đơn giá
    });

    // Tính tổng tiền: số lượng * đơn giá của từng chi tiết
    return chitietpnkList.reduce((total, chitietpnk) => {
      const giaTri = chitietpnk.so_luong * (chitietpnk.sach?.don_gia || 0);
      return total + giaTri;
    }, 0);
  }

  // Cập nhật tổng tiền trong phiếu nhập kho
  private async updatePhieuNhapKhoTotal(phieuNhapKhoId: number): Promise<void> {
    const totalAmount = await this.calculateTotalAmount(phieuNhapKhoId);

    // Lấy phiếu nhập kho cần cập nhật
    const phieuNhapKho = await this.phieuNhapKhoRepository.findOne({
      where: { id: phieuNhapKhoId },
    });

    if (!phieuNhapKho) {
      throw new NotFoundException(`Phiếu nhập kho với ID ${phieuNhapKhoId} không tồn tại`);
    }

    // Cập nhật tổng tiền
    phieuNhapKho.tongtien = totalAmount;
    await this.phieuNhapKhoRepository.save(phieuNhapKho);
  }

  // Tạo chi tiết phiếu nhập kho
  async create(createChitietpnkDto: CreateChitietpnkDto): Promise<Chitietpnk> {
    const { sachId, phieuNhapKhoId, so_luong } = createChitietpnkDto;

    // Kiểm tra sách tồn tại
    const sach = await this.sachRepository.findOne({ where: { id: sachId } });
    if (!sach) {
      throw new NotFoundException(`Sách với ID ${sachId} không tồn tại`);
    }

    // Kiểm tra phiếu nhập kho tồn tại
    const phieuNhapKho = await this.phieuNhapKhoRepository.findOne({
      where: { id: phieuNhapKhoId },
    });
    if (!phieuNhapKho) {
      throw new NotFoundException(
        `Phiếu nhập kho với ID ${phieuNhapKhoId} không tồn tại`,
      );
    }

    // Tạo chi tiết phiếu nhập kho
    const chitietpnk = this.chitietpnkRepository.create({
      sach,
      phieuNhapKho,
      so_luong,
    });

    const savedChitietpnk = await this.chitietpnkRepository.save(chitietpnk);

    // Cập nhật tổng tiền cho phiếu nhập kho
    await this.updatePhieuNhapKhoTotal(phieuNhapKhoId);

    return savedChitietpnk;
  }

  // Cập nhật chi tiết phiếu nhập kho
  async update(
    id: number,
    updateChitietpnkDto: UpdateChitietpnkDto,
  ): Promise<Chitietpnk> {
    const chitietpnk = await this.findOne(id); // Kiểm tra tồn tại
    Object.assign(chitietpnk, updateChitietpnkDto); // Gán giá trị mới
    const updatedChitietpnk = await this.chitietpnkRepository.save(chitietpnk);

    // Cập nhật tổng tiền của phiếu nhập kho
    await this.updatePhieuNhapKhoTotal(chitietpnk.phieuNhapKhoId);

    return updatedChitietpnk;
  }

  // Lấy danh sách chi tiết phiếu nhập kho
  async findAll(): Promise<Chitietpnk[]> {
    return await this.chitietpnkRepository.find({
      relations: ['sach', 'phieuNhapKho'], // Load quan hệ
    });
  }

  // Lấy chi tiết phiếu nhập kho theo ID
  async findOne(id: number): Promise<Chitietpnk> {
    const chitietpnk = await this.chitietpnkRepository.findOne({
      where: { id },
      relations: ['sach', 'phieuNhapKho'], // Load quan hệ
    });

    if (!chitietpnk) {
      throw new NotFoundException(`Chi tiết phiếu nhập kho với ID ${id} không tồn tại`);
    }

    return chitietpnk;
  }

  // Xóa chi tiết phiếu nhập kho
  async remove(id: number): Promise<void> {
    const chitietpnk = await this.findOne(id); // Kiểm tra tồn tại
    await this.chitietpnkRepository.remove(chitietpnk);

    // Cập nhật tổng tiền của phiếu nhập kho
    await this.updatePhieuNhapKhoTotal(chitietpnk.phieuNhapKhoId);
  }
}
