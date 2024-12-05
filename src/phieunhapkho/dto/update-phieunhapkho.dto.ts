import { PartialType } from '@nestjs/mapped-types';
import { CreatePhieunhapkhoDto } from './create-phieunhapkho.dto';

export class UpdatePhieunhapkhoDto extends PartialType(CreatePhieunhapkhoDto) {}
