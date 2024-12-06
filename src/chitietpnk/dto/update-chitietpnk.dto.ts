import { PartialType } from '@nestjs/mapped-types';
import { CreateChitietpnkDto } from './create-chitietpnk.dto';

export class UpdateChitietpnkDto extends PartialType(CreateChitietpnkDto) {}
