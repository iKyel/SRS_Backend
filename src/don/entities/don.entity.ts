import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Taikhoan } from 'src/taikhoan/entities/taikhoan.entity';
import { Chitietdon } from 'src/chitietdon/entities/chitietdon.entity';

@Entity('don') // Tên bảng trong cơ sở dữ liệu
export class Don {
  @PrimaryGeneratedColumn()
  id: number; // Mã đơn hàng (auto increment)

  @Column({ name: 'tentk' })
  ten_tk: string;

  @Column({ type: 'varchar', length: 255 })
  tenDon: string; // Tên đơn hàng hoặc mô tả

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  tongTien: number; // Tổng tiền của đơn hàng

  @Column({
    type: 'enum',
    enum: ['dang_xu_ly', 'hoan_thanh', 'huy'],
    default: 'dang_xu_ly',
  })
  trangThai: 'dang_xu_ly' | 'hoan_thanh' | 'huy'; // Trạng thái đơn hàng

  @ManyToOne(() => Taikhoan, (taikhoan) => taikhoan.don)
  @JoinColumn({ name: 'tentk' }) // Khóa ngoại liên kết với tài khoản
  taikhoan: Taikhoan;

  @OneToMany(() => Chitietdon, (chitietdon) => chitietdon.don)
  chitietdon: Chitietdon[];
}
