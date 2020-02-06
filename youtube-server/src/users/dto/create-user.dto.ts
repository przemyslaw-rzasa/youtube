import { IsEmail, MinLength } from "class-validator";
import { LOGIN_KEY, PASSWORD_KEY } from "../constants";

export class CreateUserDto {
  @IsEmail()
  [LOGIN_KEY]: string;

  @MinLength(4)
  [PASSWORD_KEY]: string;
}
