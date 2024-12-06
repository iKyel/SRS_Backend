import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { NhaXuatBan } from 'src/nhaxuatban/entities/nhaxuatban.entity';
import { TacGia } from 'src/tacgia/entities/tacgia.entity';
import { TheLoai } from 'src/the-loai/entities/the-loai.entity';
import { Chitietdon } from 'src/chitietdon/entities/chitietdon.entity';
import { Chitietpnk } from 'src/chitietpnk/entities/chitietpnk.entity';
import { NhanBan } from 'src/nhanban/entities/nhanban.entity';

@Entity()
export class Sach {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ten: string;

  @Column({ type: 'int' })
  so_luong: number;

  @Column({ type: 'decimal' })
  don_gia: number;

  @Column({ type: 'int' })
  nam_xb: number;

  // Quan hệ với Nhà Xuất Bản (1 nhiều)
  @ManyToOne(() => NhaXuatBan, nhaXuatBan => nhaXuatBan.sachs)
  nhaXuatBan: NhaXuatBan;

  // Quan hệ với Tác Giả (1 nhiều)
  @ManyToOne(() => TacGia, tacGia => tacGia.sachs)
  tacGia: TacGia;

  // Quan hệ với Thể Loại (1 nhiều)
  @ManyToOne(() => TheLoai, theLoai => theLoai.sachs)
  theLoai: TheLoai;

  // Quan hệ với chi tiết đơn
  @OneToMany(() => Chitietdon, (chitietdon) => chitietdon.sach)
  chitietdon: Chitietdon[];

  // Quan hệ OneToMany với Chitietpnk
  @OneToMany(() => Chitietpnk, (chitietpnk) => chitietpnk.sach)
  chitietpnk: Chitietpnk[]; // Các chi tiết phiếu nhập kho

  @OneToMany(() => NhanBan, (nhanban) => nhanban.sach)
  nhanban: NhanBan[]; // Liên kết đến các bản ghi nhân bản
}
