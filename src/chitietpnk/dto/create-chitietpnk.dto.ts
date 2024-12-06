import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateChitietpnkDto {
  @IsInt()
  @IsNotEmpty()
  sachId: number;

  @IsInt()
  @IsNotEmpty()
  phieuNhapKhoId: number;

  @IsInt()
  @IsNotEmpty()
  so_luong: number;
}
