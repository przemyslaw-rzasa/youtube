import { IsEmail, MinLength, IsOptional } from "class-validator";

export class UpdateUserDto {
  @IsEmail()
  email: string;

  @IsOptional()
  @MinLength(4)
  password: string;

  @IsOptional()
  id: number;
}
