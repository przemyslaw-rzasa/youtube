import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Put,
  Delete,
  Get,
  UseGuards,
  HttpCode
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";
import { AuthGuard } from "@nestjs/passport";
import { GetUser } from "src/auth/get-user.decorator";
import { User } from "./user.entity";
import { UpdateUserDto } from "./dto/update-user.dto";
import { DeleteUserDto } from "./dto/delete-user.dto";

@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard("jwt"))
  getUser(@GetUser() user: User) {
    return user;
  }

  @Post()
  @HttpCode(201)
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
  @HttpCode(204)
  @UseGuards(AuthGuard("jwt"))
  deleteUser(@Body() deleteUserDto: DeleteUserDto, @GetUser() user) {
    console.log(deleteUserDto);
    return this.usersService.deleteUser(deleteUserDto, user);
  }
}
