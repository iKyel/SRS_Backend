import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chitietdon } from './entities/chitietdon.entity';
import { CreateChitietdonDto } from './dto/create-chitietdon.dto';
import { UpdateChitietdonDto } from './dto/update-chitietdon.dto';
import { Don } from 'src/don/entities/don.entity';
import { Sach } from 'src/sach/entities/sach.entity';

@Injectable()
export class ChitietdonService {
  constructor(
    @InjectRepository(Chitietdon)
    private readonly chitietdonRepository: Repository<Chitietdon>,
    @InjectRepository(Don)
    private readonly donRepository: Repository<Don>,
    @InjectRepository(Sach)
    private readonly sachRepository: Repository<Sach>,
  ) {}

  // Tạo chi tiết đơn hàng
  async create(createChitietdonDto: CreateChitietdonDto): Promise<Chitietdon> {
    const { donId, sachId, soLuong } = createChitietdonDto;

    // Kiểm tra đơn hàng có tồn tại không
    const don = await this.donRepository.findOne({ where: { id: donId } });
    if (!don) {
      throw new NotFoundException(`Đơn hàng với ID ${donId} không tồn tại`);
    }

    // Kiểm tra sách có tồn tại không
    const sach = await this.sachRepository.findOne({ where: { id: sachId } });
    if (!sach) {
      throw new NotFoundException(`Sách với ID ${sachId} không tồn tại`);
    }

    // Kiểm tra số lượng sách có đủ không
    if (sach.so_luong < soLuong) {
      throw new BadRequestException(`Số lượng sách không đủ, hiện tại chỉ còn ${sach.so_luong}`);
    }

    // Tạo chi tiết đơn hàng
    const chitietdon = this.chitietdonRepository.create({
      don,
      sach,
      soLuong,
      donGia: sach.don_gia,
    });

    // Cập nhật số lượng sách còn lại
    sach.so_luong -= soLuong;
    await this.sachRepository.save(sach);

    return await this.chitietdonRepository.save(chitietdon);
  }

  // Lấy danh sách tất cả chi tiết đơn hàng
  async findAll(): Promise<Chitietdon[]> {
    return await this.chitietdonRepository.find({
      relations: ['don', 'sach'], // Load quan hệ với đơn hàng và sách
    });
  }

  // Lấy thông tin chi tiết đơn hàng theo ID
  async findOne(id: number): Promise<Chitietdon> {
    const chitietdon = await this.chitietdonRepository.findOne({
      where: { id },
      relations: ['don', 'sach'],
    });

    if (!chitietdon) {
      throw new NotFoundException(`Chi tiết đơn với ID ${id} không tồn tại`);
    }

    return chitietdon;
  }

  // Cập nhật chi tiết đơn hàng
  async update(id: number, updateChitietdonDto: UpdateChitietdonDto): Promise<Chitietdon> {
    const chitietdon = await this.findOne(id); // Kiểm tra chi tiết đơn tồn tại

    const { soLuong, sachId } = updateChitietdonDto;

    if (sachId) {
      const sach = await this.sachRepository.findOne({ where: { id: sachId } });
      if (!sach) {
        throw new NotFoundException(`Sách với ID ${sachId} không tồn tại`);
      }
      chitietdon.sach = sach;
    }

    if (soLuong) {
      chitietdon.soLuong = soLuong;
    }

    return await this.chitietdonRepository.save(chitietdon);
  }

  // Xóa chi tiết đơn hàng
  async remove(id: number): Promise<void> {
    const chitietdon = await this.findOne(id); // Kiểm tra chi tiết đơn tồn tại
    await this.chitietdonRepository.remove(chitietdon);
  }
}
