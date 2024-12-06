import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { PhieuNhapKho } from 'src/phieunhapkho/entities/phieunhapkho.entity';
import { Sach } from 'src/sach/entities/sach.entity';
import { NhanBan } from 'src/nhanban/entities/nhanban.entity';

@Entity('chitietpnk') // Tên bảng trong cơ sở dữ liệu
export class Chitietpnk {
  @PrimaryGeneratedColumn()
  id: number; // Khóa chính

  @Column({ name: 'sachId' })
  sachId: number;

  @Column({ name: 'phieuNhapKhoId' })
  phieuNhapKhoId: number; 

  @Column()
  so_luong: number; // Số lượng sách trong phiếu nhập kho

  @ManyToOne(() => Sach, (sach) => sach.chitietpnk)
  @JoinColumn({ name: 'sachId' }) // Chỉ định tên cột khóa ngoại cho sách
  sach: Sach; // Sách tương ứng

  
  @ManyToOne(() => PhieuNhapKho, (phieuNhapKho) => phieuNhapKho.chitietpnk)
  @JoinColumn({ name: 'phieuNhapKhoId' }) // Chỉ định tên cột khóa ngoại cho phiếu nhập kho
  phieuNhapKho: PhieuNhapKho; // Phiếu nhập kho tương ứng

  @OneToMany(() => NhanBan, (nhanban) => nhanban.chitietpnk)
  nhanban: NhanBan[]; // Liên kết đến các bản ghi nhân bản
}
