import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateTacgiaDto {
    @IsNotEmpty()
    @IsString()
    ten: string;

    @IsOptional()
    @IsString()
    tieu_su: string
}