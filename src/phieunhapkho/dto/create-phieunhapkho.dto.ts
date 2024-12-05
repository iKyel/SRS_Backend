// create-phieunhapkho.dto.ts
import { IsNotEmpty, IsOptional, IsEnum, IsNumber } from 'class-validator';

export class CreatePhieunhapkhoDto {
  @IsNotEmpty()
  nhanvien: string; // tên của nhân viên tạo phiếu nhập kho

  @IsOptional()
  daily?: string; // tên của đại lý

  @IsEnum(['ChoDuyet', 'DaDuyet', 'Huy'])
  trangthai: 'ChoDuyet' | 'DaDuyet' | 'Huy'; // Trạng thái phiếu nhập kho

  @IsNumber()
  tongtien: number; // Tổng tiền trong phiếu nhập kho
}
