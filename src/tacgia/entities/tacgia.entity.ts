import { Sach } from 'src/sach/entities/sach.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity({ name: 'TacGia' })
export class TacGia {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ten: string;

  @Column({ type: 'text', nullable: true })
  tieu_su: string;

  // Quan hệ với Sách (1 nhiều)
  @OneToMany(() => Sach, (sach) => sach.tacGia)
  sachs: Sach[];
}
