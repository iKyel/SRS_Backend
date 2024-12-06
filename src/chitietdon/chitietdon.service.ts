import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { Chitietdon } from './entities/chitietdon.entity';
import { CreateChitietdonDto } from './dto/create-chitietdon.dto';
import { UpdateChitietdonDto } from './dto/update-chitietdon.dto';
import { Don } from 'src/don/entities/don.entity';
import { Sach } from 'src/sach/entities/sach.entity';
import { DonService } from 'src/don/don.service';
import { NhanBan } from 'src/nhanban/entities/nhanban.entity';

@Injectable()
export class ChitietdonService {
  constructor(
    @InjectRepository(Chitietdon)
    private readonly chitietdonRepository: Repository<Chitietdon>,
    @InjectRepository(Don)
    private readonly donRepository: Repository<Don>,
    @InjectRepository(Sach)
    private readonly sachRepository: Repository<Sach>,
    private readonly donService: DonService, // Inject DonService
    @InjectRepository(NhanBan)
    private readonly nhanBanRepository: Repository<NhanBan>,
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
      throw new BadRequestException(
        `Số lượng sách không đủ, hiện tại chỉ còn ${sach.so_luong}`,
      );
    }

    // Tạo chi tiết đơn hàng
    const chitietdon = this.chitietdonRepository.create({
      don,
      sach,
      soLuong,
      donGia: sach.don_gia,
    });

    // Lưu chi tiết đơn hàng
    const savedChitietdon = await this.chitietdonRepository.save(chitietdon);

    // Tính lại tổng tiền cho đơn hàng và cập nhật
    await this.donService.update(donId, {});

    const nhanBans = await this.nhanBanRepository
      .createQueryBuilder('nhanban')
      .where('nhanban.sachId = :sachId', { sachId })
      .andWhere(
        '(nhanban.trang_thai IS NULL OR nhanban.trang_thai NOT IN (:...statuses))',
        { statuses: ['hoan_thanh', 'dang_xu_ly'] },
      )
      .take(soLuong)
      .getMany();

    // Kiểm tra nếu không đủ nhân bản
    if (nhanBans.length < soLuong) {
      throw new BadRequestException(
        `Không đủ số lượng nhân bản cho sách ID ${sachId}. Cần ${soLuong}, nhưng chỉ tìm được ${nhanBans.length}.`,
      );
    }

    // Gắn từng nhân bản vào chi tiết đơn và cập nhật trạng thái nhân bản
    for (const nhanBan of nhanBans) {
      nhanBan.chitietdon = savedChitietdon; // Gắn chi tiết đơn
      nhanBan.trang_thai = don.trangThai; // Gắn trạng thái từ đơn hàng vào nhân bản
      await this.nhanBanRepository.save(nhanBan); // Lưu lại thay đổi
    }

    return savedChitietdon;
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
  async update(
    id: number,
    updateChitietdonDto: UpdateChitietdonDto,
  ): Promise<Chitietdon> {
    const chitietdon = await this.findOne(id); // Kiểm tra chi tiết đơn tồn tại

    const { soLuong, sachId } = updateChitietdonDto;

    // Cập nhật thông tin sách
    if (sachId) {
      const sach = await this.sachRepository.findOne({ where: { id: sachId } });
      if (!sach) {
        throw new NotFoundException(`Sách với ID ${sachId} không tồn tại`);
      }
      chitietdon.sach = sach;
    }

    // Cập nhật số lượng
    if (soLuong) {
      chitietdon.soLuong = soLuong;
    }

    // Lưu chi tiết đơn đã cập nhật
    const updatedChitietdon = await this.chitietdonRepository.save(chitietdon);

    // Sau khi cập nhật chi tiết đơn hàng, tính lại tổng tiền cho đơn
    const donId = chitietdon.don.id; // Lấy ID đơn hàng từ chi tiết đơn hàng
    await this.donService.update(donId, {}); // Cập nhật tổng tiền của đơn hàng

    return updatedChitietdon; // Trả về chi tiết đơn đã được cập nhật
  }

  // Xóa chi tiết đơn hàng
  async remove(id: number): Promise<void> {
    const chitietdon = await this.findOne(id); // Kiểm tra chi tiết đơn tồn tại
    await this.chitietdonRepository.remove(chitietdon);
  }
}
