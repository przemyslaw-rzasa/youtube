import { IsEmail, MinLength, IsOptional } from "class-validator";
import { LOGIN_KEY, PASSWORD_KEY } from "../constants";

export class UpdateUserDto {
  @IsEmail()
  [LOGIN_KEY]: string;

  @IsOptional()
  @MinLength(4)
  [PASSWORD_KEY]: string;

  @IsOptional()
  id: number;
}
