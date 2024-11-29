import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'TheLoai' })
export class TheLoai {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ten: string;
}
