import { PartialType } from '@nestjs/mapped-types';
import { CreateTacgiaDto } from './create-tacgia.dto';

export class UpdateTacgiaDto extends PartialType(CreateTacgiaDto) {}
