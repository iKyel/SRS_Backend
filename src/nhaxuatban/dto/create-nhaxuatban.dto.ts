import { IsString, IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class CreateNhaxuatbanDto {
  @IsString()
  @IsNotEmpty({ message: 'Tên nhà xuất bản không được để trống' })
  ten: string;

  @IsString()
  @IsNotEmpty({ message: 'Địa chỉ không được để trống' })
  dia_chi: string;

  @IsString()
  @IsNotEmpty({ message: 'Số điện thoại không được để trống' })
  @IsPhoneNumber('VN', { message: 'Số điện thoại không hợp lệ' })
  so_dien_thoai: string;
}
