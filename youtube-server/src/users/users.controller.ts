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
import { GetUser } from "src/auth/get-user.decorator";
import { User } from "./user.entity";
import { UpdateUserDto } from "./dto/update-user.dto";

@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard("jwt"))
  getUser(@GetUser() user: User) {
    return user;
  }

  @Post()
  @UsePipes(ValidationPipe)
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Put()
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard("jwt"))
  updateUser(@Body() updateUserDto: UpdateUserDto, @GetUser() user) {
    return this.usersService.updateUser(updateUserDto, user);
  }

  @Delete()
  @UseGuards(AuthGuard("jwt"))
  deleteUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }
}
