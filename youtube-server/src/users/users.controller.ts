import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";
import { AuthUserDto } from "./dto/auth-user.dto";

@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post("/sign-up")
  @UsePipes(ValidationPipe)
  signUp(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Post("/sign-in")
  async singIn(@Body() authUserDto: AuthUserDto) {
    return this.usersService.singIn(authUserDto);
  }
}
