import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Sach } from 'src/sach/entities/sach.entity';

@Entity()
export class NhaXuatBan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ten: string;

  @Column()
  dia_chi: string;

  @Column()
  so_dien_thoai: string;

  @OneToMany(() => Sach, sach => sach.nhaXuatBan)
  sachs: Sach[];
}
