import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Don } from './entities/don.entity';
import { CreateDonDto } from './dto/create-don.dto';
import { UpdateDonDto } from './dto/update-don.dto';
import { Taikhoan } from 'src/taikhoan/entities/taikhoan.entity';
import { Chitietdon } from 'src/chitietdon/entities/chitietdon.entity';
import { Sach } from 'src/sach/entities/sach.entity';
import { NhanBan } from 'src/nhanban/entities/nhanban.entity';

@Injectable()
export class DonService {
  constructor(
    @InjectRepository(Don)
    private readonly donRepository: Repository<Don>, // Repository của bảng đơn hàng
    @InjectRepository(Taikhoan)
    private readonly taikhoanRepository: Repository<Taikhoan>,
    @InjectRepository(Chitietdon)
    private readonly chitietdonRepository: Repository<Chitietdon>, // Để tính toán tổng tiền từ chi tiết đơn hàng
    @InjectRepository(Sach)
    private readonly sachRepository: Repository<Sach>,
    @InjectRepository(NhanBan)
    private readonly nhanBanRepository: Repository<NhanBan>,
  ) {}

  // Hàm tính tổng tiền của đơn hàng
  private async calculateTotalAmount(donId: number): Promise<number> {
    const chitietdon = await this.chitietdonRepository.find({
      where: { don_id: donId },
    });

    return chitietdon.reduce((total, item) => {
      return total + item.soLuong * item.donGia; // Tính tổng tiền từ số lượng * đơn giá
    }, 0);
  }

  // Thêm đơn hàng mới
  async create(createDonDto: CreateDonDto): Promise<Don> {
    // Kiểm tra tài khoản có tồn tại không
    const taikhoan = await this.taikhoanRepository.findOne({
      where: { tentk: createDonDto.tentk },
    });

    if (!taikhoan) {
      throw new NotFoundException(
        `Tài khoản với tên ${createDonDto.tentk} không tồn tại`,
      );
    }

    // Tạo đối tượng đơn hàng
    const newDon = this.donRepository.create({
      ...createDonDto,
      taikhoan, // Liên kết tài khoản với đơn hàng
    });

    const savedDon = await this.donRepository.save(newDon); // Lưu đơn hàng

    // Tính tổng tiền của đơn hàng và cập nhật
    const totalAmount = await this.calculateTotalAmount(savedDon.id);
    savedDon.tongTien = totalAmount;

    return await this.donRepository.save(savedDon); // Lưu lại đơn hàng với tổng tiền
  }

  async update(id: number, updateDonDto: UpdateDonDto): Promise<Don> {
    const don = await this.findOne(id); // Kiểm tra đơn hàng tồn tại
    const { trangThai } = updateDonDto;

    // Lấy tất cả các chi tiết đơn hàng liên quan đến đơn này
    const chitietdon = await this.chitietdonRepository.find({
      where: { don_id: id },
      relations: ['sach', 'nhanban'], // Bao gồm quan hệ với bảng sách và nhân bản
    });

    // Cập nhật trạng thái nhân bản khi trạng thái đơn hàng thay đổi
    for (const item of chitietdon) {
      for (const nhanBan of item.nhanban) {
        nhanBan.trang_thai = trangThai; // Gắn trạng thái của đơn hàng vào nhân bản
        await this.nhanBanRepository.save(nhanBan); // Lưu lại thay đổi
      }
    }

    // Cập nhật trạng thái đơn hàng
    if (trangThai && trangThai === 'hoan_thanh') {

      // Duyệt qua từng chi tiết đơn hàng để trừ số lượng sách
      for (const item of chitietdon) {
        const sach = item.sach;

        // Kiểm tra sách có tồn tại và đủ số lượng không
        if (!sach) {
          throw new NotFoundException(
            `Sách với ID ${item.sach_id} không tồn tại`,
          );
        }

        if (sach.so_luong < item.soLuong) {
          throw new Error(
            `Không đủ số lượng sách "${sach.ten}" trong kho. Hiện tại chỉ còn ${sach.so_luong}.`,
          );
        }

        // Trừ số lượng sách
        sach.so_luong -= item.soLuong;

        // Cập nhật lại sách trong cơ sở dữ liệu
        await this.sachRepository.save(sach);
      }
    }

    // Cập nhật các thuộc tính khác của đơn hàng
    Object.assign(don, updateDonDto);

    const updatedDon = await this.donRepository.save(don);

    // Tính tổng tiền của đơn hàng sau khi cập nhật chi tiết (nếu cần)
    const totalAmount = await this.calculateTotalAmount(updatedDon.id);
    updatedDon.tongTien = totalAmount;

    return await this.donRepository.save(updatedDon); // Lưu lại đơn hàng với tổng tiền
  }

  // Lấy tất cả đơn hàng
  async findAll(): Promise<Don[]> {
    return await this.donRepository.find(); // Lấy toàn bộ danh sách đơn hàng kèm tài khoản liên kết
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

  // Xóa đơn hàng
  async remove(id: number): Promise<void> {
    const don = await this.findOne(id); // Kiểm tra đơn hàng tồn tại
    await this.donRepository.remove(don); // Xóa đơn hàng khỏi cơ sở dữ liệu
  }
}
