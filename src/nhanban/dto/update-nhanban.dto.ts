import { PartialType } from '@nestjs/mapped-types';
import { CreateNhanbanDto } from './create-nhanban.dto';

export class UpdateNhanbanDto extends PartialType(CreateNhanbanDto) {}
