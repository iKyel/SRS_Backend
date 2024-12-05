import { PartialType } from '@nestjs/mapped-types';
import { CreateTaikhoanDto } from './create-taikhoan.dto';

export class UpdateTaikhoanDto extends PartialType(CreateTaikhoanDto) {}
