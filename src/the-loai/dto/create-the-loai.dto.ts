import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTheLoaiDto {
  @IsNotEmpty()
  @IsString()
  ten: string;
}
