import { PartialType } from '@nestjs/mapped-types';
import { CreateNhaxuatbanDto } from './create-nhaxuatban.dto';

export class UpdateNhaxuatbanDto extends PartialType(CreateNhaxuatbanDto) {}
