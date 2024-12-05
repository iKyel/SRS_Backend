import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Taikhoan } from 'src/taikhoan/entities/taikhoan.entity';

@Entity('phieunhapkho') // Tên bảng trong cơ sở dữ liệu
export class PhieuNhapKho {
  @PrimaryGeneratedColumn()
  id: number; // Khóa chính, tự động tăng

  @Column({name: 'nhanvien'})
  ten_nv: string; // Tên nhân viên

  @Column({name: 'daily'})
  ten_daily: string; // Tên nhân viên

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  ngaygio: Date; // Ngày giờ tạo phiếu nhập kho

  @Column({ type: 'enum', enum: ['ChoDuyet', 'DaDuyet', 'Huy'], default: 'ChoDuyet' })
  trangthai: 'ChoDuyet' | 'DaDuyet' | 'Huy'; // Trạng thái phiếu nhập kho

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  tongtien: number; // Tổng tiền trong phiếu nhập kho

  @ManyToOne(() => Taikhoan, (taikhoan) => taikhoan.phieuNhapKhoNV, { nullable: false })
  @JoinColumn({ name: 'nhanvien' }) // Chỉ định tên cột khóa ngoại cho nhân viên
  nhanvien: Taikhoan; // Nhân viên tạo phiếu nhập kho

  @ManyToOne(() => Taikhoan, (taikhoan) => taikhoan.phieuNhapKhoDL, { nullable: true })
  @JoinColumn({ name: 'daily' }) // Chỉ định tên cột khóa ngoại cho đại lý
  daily: Taikhoan; // Đại lý liên quan đến phiếu nhập kho (nếu có)
}
