import { IsNumber, IsOptional } from "class-validator";

export class DeleteUserDto {
  @IsOptional()
  @IsNumber()
  id?: number;
}
