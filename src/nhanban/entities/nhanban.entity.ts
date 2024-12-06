import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Chitietpnk } from 'src/chitietpnk/entities/chitietpnk.entity';
import { Sach } from 'src/sach/entities/sach.entity';
import { Chitietdon } from 'src/chitietdon/entities/chitietdon.entity';

@Entity('nhanban') // Tên bảng trong cơ sở dữ liệu
export class NhanBan {
  @PrimaryGeneratedColumn()
  id: number; // Khóa chính tự động tăng

  @Column({name: 'sachId'})
  sachId: number;

  @ManyToOne(() => Sach, (sach) => sach.nhanban)
  @JoinColumn({ name: 'sachId' }) // Chỉ định tên cột khóa ngoại cho sách
  sach: Sach; // Liên kết đến sách

  @Column({ type: 'varchar', length: 20, nullable: true })
  trang_thai?: string; // Trạng thái nhân bản (ví dụ: "Đang xử lý", "Hoàn thành", "Hủy")

  @Column({ type: 'varchar', length: 17, unique: true })
  ISBN: string; // Mã ISBN của sách, unique để đảm bảo tính duy nhất

  @ManyToOne(() => Chitietpnk, (chitietpnk) => chitietpnk.nhanban)
  chitietpnk: Chitietpnk; // Liên kết đến chi tiết phiếu nhập kho

  @ManyToOne(() => Chitietdon, (chitietdon) => chitietdon.nhanban)
  chitietdon?: Chitietdon; // Liên kết đến chi tiết đơn
}
