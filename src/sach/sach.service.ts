import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSachDto } from './dto/create-sach.dto';
import { UpdateSachDto } from './dto/update-sach.dto';
import { Sach } from './entities/sach.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TacgiaService } from 'src/tacgia/tacgia.service'; // Import TacgiaService
import { TheLoaiService } from 'src/the-loai/the-loai.service'; // Import TheLoaiService
import { NhaxuatbanService } from 'src/nhaxuatban/nhaxuatban.service'; // Import NhaXuatBanService

@Injectable()
export class SachService {
  constructor(
    @InjectRepository(Sach)
    private readonly sachRepository: Repository<Sach>,

    private readonly tacgiaService: TacgiaService,  // Inject TacgiaService

    private readonly theLoaiService: TheLoaiService, // Inject TheLoaiService

    private readonly nhaXuatBanService: NhaxuatbanService, // Inject NhaXuatBanService
  ) {}

  // Phương thức tạo sách mới
  async create(createSachDto: CreateSachDto): Promise<Sach> {
    const { tacGia, theLoai, nhaXuatBan, ...rest } = createSachDto;

    // Sử dụng TacgiaService để tìm tác giả thay vì trực tiếp tìm qua repository
    const foundTacGia = await this.tacgiaService.findOne(tacGia.id);  // Tìm tác giả qua TacgiaService
    if (!foundTacGia) {
      throw new NotFoundException(`Tác giả với ID ${tacGia.id} không tồn tại`);
    }

    // Sử dụng TheLoaiService để tìm thể loại thay vì trực tiếp tìm qua repository
    const foundTheLoai = await this.theLoaiService.findOne(theLoai.id);  // Tìm thể loại qua TheLoaiService
    if (!foundTheLoai) {
      throw new NotFoundException(`Thể loại với ID ${theLoai.id} không tồn tại`);
    }

    // Sử dụng NhaXuatBanService để tìm nhà xuất bản thay vì trực tiếp tìm qua repository
    const foundNhaXuatBan = await this.nhaXuatBanService.findOne(nhaXuatBan.id);  // Tìm nhà xuất bản qua NhaXuatBanService
    if (!foundNhaXuatBan) {
      throw new NotFoundException(`Nhà xuất bản với ID ${nhaXuatBan.id} không tồn tại`);
    }

    // Tạo đối tượng sách mới với các thông tin đã tìm được
    const newSach = this.sachRepository.create({
      ...rest,
      tacGia: foundTacGia,
      theLoai: foundTheLoai,
      nhaXuatBan: foundNhaXuatBan,
    });

    // Lưu vào cơ sở dữ liệu
    return this.sachRepository.save(newSach);
  }

  // Phương thức tìm tất cả sách
  async findAll(): Promise<Sach[]> {
    return await this.sachRepository.find({
      relations: {
        tacGia: true,
        theLoai: true,
        nhaXuatBan: true,
      }
    });
  }

  // Phương thức tìm sách theo id
  findOne(id: number): Promise<Sach> {
    return this.sachRepository.findOne({ where: { id: id } });
  }

  // Phương thức cập nhật sách
  async update(id: number, updateSachDto: UpdateSachDto): Promise<Sach> {
    const sach = await this.sachRepository.findOne({ where: { id: id } });
    if (!sach) {
      throw new NotFoundException(`Sách với ID ${id} không tồn tại`);
    }
    const updatedSach = Object.assign(sach, updateSachDto);
    return this.sachRepository.save(updatedSach);
  }

  // Phương thức xóa sách
  async remove(id: number): Promise<void> {
    const sach = await this.sachRepository.findOne({ where: { id: id } });
    if (!sach) {
      throw new NotFoundException(`Sách với ID ${id} không tồn tại`);
    }
    await this.sachRepository.remove(sach);
  }
}
