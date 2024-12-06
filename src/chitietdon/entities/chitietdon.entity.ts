import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Don } from 'src/don/entities/don.entity';
import { Sach } from 'src/sach/entities/sach.entity';
import { NhanBan } from 'src/nhanban/entities/nhanban.entity';

@Entity('chitietdon') // Tên bảng trong cơ sở dữ liệu
export class Chitietdon {
  @PrimaryGeneratedColumn()
  id: number; // ID tự tăng cho từng chi tiết đơn

  @Column({name: 'don_id'})
  don_id: number

  @Column({name: 'sach_id'})
  sach_id: number

  @Column({ type: 'int' })
  soLuong: number; // Số lượng sách trong đơn hàng

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  donGia: number; // Giá thành của mỗi sách trong đơn hàng

  @ManyToOne(() => Don, (don) => don.chitietdon)
  @JoinColumn({ name: 'don_id' }) // Khóa ngoại đến bảng Don
  don: Don;

  @ManyToOne(() => Sach, (sach) => sach.chitietdon)
  @JoinColumn({ name: 'sach_id' }) // Khóa ngoại đến bảng Sach
  sach: Sach;

  @OneToMany(() => NhanBan, (nhanban) => nhanban.chitietdon)
  nhanban: NhanBan[]; // Liên kết đến các bản ghi nhân bản
}
