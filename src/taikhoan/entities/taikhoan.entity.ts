import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { Don } from 'src/don/entities/don.entity';
import { PhieuNhapKho } from 'src/phieunhapkho/entities/phieunhapkho.entity';

@Entity('taikhoan') // Tên bảng trong cơ sở dữ liệu
export class Taikhoan {
  @PrimaryColumn({ type: 'varchar', length: 255 })
  tentk: string; // Tên tài khoản, phải là duy nhất

  @Column({ type: 'varchar', length: 255 })
  matkhau: string; // Mật khẩu, lưu dưới dạng đã mã hóa

  @Column({ type: 'varchar', length: 100 })
  hodem: string; // Họ đệm

  @Column({ type: 'varchar', length: 50 })
  ten: string; // Tên

  @Column({ type: 'enum', enum: ['KH', 'NV', 'DL'], default: 'KH' })
  vaitro: 'KH' | 'NV' | 'DL'; // Vai trò: KH (Khách hàng), NV (Nhân viên), DL (Đại lý)

  @OneToMany(() => Don, (don) => don.taikhoan)
  don: Don[]; // Liên kết với các đơn hàng

  @OneToMany(() => PhieuNhapKho, (phieuNhapKho) => phieuNhapKho.nhanvien)
  phieuNhapKhoNV: PhieuNhapKho[]; // Các phiếu nhập kho mà nhân viên này đã tạo

  @OneToMany(() => PhieuNhapKho, (phieuNhapKho) => phieuNhapKho.daily)
  phieuNhapKhoDL: PhieuNhapKho[]; // Các phiếu nhập kho liên quan đến đại lý này
}
