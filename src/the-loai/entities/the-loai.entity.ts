import { Sach } from 'src/sach/entities/sach.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity({ name: 'TheLoai' })
export class TheLoai {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ten: string;

   // Quan hệ với Sách (1 nhiều)
   @OneToMany(() => Sach, sach => sach.theLoai)
   sachs: Sach[];
}
