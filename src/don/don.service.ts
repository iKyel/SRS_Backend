import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Don } from './entities/don.entity';
import { CreateDonDto } from './dto/create-don.dto';
import { UpdateDonDto } from './dto/update-don.dto';
import { Taikhoan } from 'src/taikhoan/entities/taikhoan.entity';

@Injectable()
export class DonService {
  constructor(
    @InjectRepository(Don)
    private readonly donRepository: Repository<Don>, // Repository của bảng đơn hàng
    @InjectRepository(Taikhoan)
    private readonly taikhoanRepository: Repository<Taikhoan>,
  ) {}

  // Thêm đơn hàng mới
  async create(createDonDto: CreateDonDto): Promise<Don> {
    // Kiểm tra tài khoản có tồn tại không
    const taikhoan = await this.taikhoanRepository.findOne({
      where: { tentk: createDonDto.tentk },
    });

    if (!taikhoan) {
      throw new NotFoundException(`Tài khoản với tên ${createDonDto.tentk} không tồn tại`);
    }

    // Tạo đối tượng đơn hàng
    const newDon = this.donRepository.create({
      ...createDonDto,
      taikhoan, // Liên kết tài khoản với đơn hàng
    });

    return await this.donRepository.save(newDon); // Lưu vào cơ sở dữ liệu
  }

  // Lấy tất cả đơn hàng
  async findAll(): Promise<Don[]> {
    return await this.donRepository.find({ relations: ['taikhoan'] }); // Lấy toàn bộ danh sách đơn hàng kèm tài khoản liên kết
  }

  // Lấy đơn hàng theo ID
  async findOne(id: number): Promise<Don> {
    const don = await this.donRepository.findOne({
      where: { id },
      relations: ['taikhoan'], // Bao gồm thông tin tài khoản
    });
    if (!don) {
      throw new NotFoundException(`Đơn hàng với ID ${id} không tồn tại`);
    }
    return don;
  }

  // Cập nhật đơn hàng
  async update(id: number, updateDonDto: UpdateDonDto): Promise<Don> {
    const don = await this.findOne(id); // Kiểm tra đơn hàng tồn tại
    Object.assign(don, updateDonDto); // Gán các giá trị từ DTO
    return await this.donRepository.save(don); // Lưu lại sau khi cập nhật
  }

  // Xóa đơn hàng
  async remove(id: number): Promise<void> {
    const don = await this.findOne(id); // Kiểm tra đơn hàng tồn tại
    await this.donRepository.remove(don); // Xóa đơn hàng khỏi cơ sở dữ liệu
  }
}
