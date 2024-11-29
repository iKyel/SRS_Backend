import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity({ name: 'TacGia' })
export class TacGia {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    ten: string;

    @Column({type: 'text', nullable: true, default: 'không có tiểu sử' })
    tieu_su: string;
}