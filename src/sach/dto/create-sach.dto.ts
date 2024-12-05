import { IsString, IsNumber, IsInt, Min, IsOptional, IsObject } from 'class-validator';
import { TacGia } from 'src/tacgia/entities/tacgia.entity'; // Import TacGia
import { TheLoai } from 'src/the-loai/entities/the-loai.entity';
import { NhaXuatBan } from 'src/nhaxuatban/entities/nhaxuatban.entity';

export class CreateSachDto {
  @IsString()
  ten: string;

  @IsInt()
  @Min(0)
  so_luong: number;

  @IsNumber()
  @Min(0)
  don_gia: number;

  @IsInt()
  nam_xb: number;

  @IsObject()
  tacGia: TacGia; // Thể hiện tác giả với đối tượng TacGia

  @IsObject()
  theLoai: TheLoai; // Thể hiện thể loại với đối tượng TheLoai

  @IsObject()
  nhaXuatBan: NhaXuatBan; // Thể hiện nhà xuất bản với
}
