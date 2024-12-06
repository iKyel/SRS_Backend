// create-phieunhapkho.dto.ts
import { IsNotEmpty, IsOptional, IsEnum, IsNumber, IsString, IsDecimal } from 'class-validator';

export class CreatePhieunhapkhoDto {
  @IsNotEmpty()
  @IsString()
  nhanvien: string; // Tên tài khoản của nhân viên (khóa ngoại)

  @IsOptional()
  @IsString()
  daily?: string; // Tên tài khoản đại lý (khóa ngoại)

  @IsOptional()
  @IsDecimal()
  tongtien?: number; // Tổng tiền, mặc định là 0

  @IsOptional()
  @IsEnum(['ChoDuyet', 'DaDuyet', 'Huy'])
  trangthai?: 'ChoDuyet' | 'DaDuyet' | 'Huy'; // Trạng thái phiếu nhập kho
}
