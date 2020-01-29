import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Put,
  Delete,
  Get,
  UseGuards
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";
import { AuthGuard } from "@nestjs/passport";

@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  @UsePipes(ValidationPipe)
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Put()
  @UsePipes(ValidationPipe)
  updateUser(@Body() updateUserDto: CreateUserDto) {
    return this.usersService.updateUser(updateUserDto);
  }

  @Delete()
  deleteUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  // @todo: use also 'local' strategy
  // Just for testing purpose
  @UseGuards(AuthGuard("jwt"))
  @Get("auth-test")
  async testAuth() {
    return "Success!";
  }
}
