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
import { AuthGuard } from "@nestjs/passport";

import { UserTokenDataDto } from "src/auth/dto/user-token.dto";
import { GetUser } from "src/auth/get-user.decorator";

import { UsersService } from "./users.service";
import { User } from "./user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { DeleteUserDto } from "./dto/delete-user.dto";

@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @HttpCode(200)
  @UseGuards(AuthGuard("jwt"))
  getUser(@GetUser() userTokenDataDto: UserTokenDataDto): Promise<User> {
    return this.usersService.getUser(userTokenDataDto);
  }

  @Post()
  @HttpCode(201)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.createUser(createUserDto);
  }

  @Put()
  @HttpCode(201)
  @UseGuards(AuthGuard("jwt"))
  @UsePipes(new ValidationPipe({ whitelist: true }))
  updateUser(
    @Body() updateUserDto: UpdateUserDto,
    @GetUser() userTokenDataDto: UserTokenDataDto
  ): Promise<User> {
    return this.usersService.updateUser(updateUserDto, userTokenDataDto);
  }

  @Delete()
  @HttpCode(204)
  @UseGuards(AuthGuard("jwt"))
  deleteUser(
    @Body() deleteUserDto: DeleteUserDto,
    @GetUser() userTokenDataDto: UserTokenDataDto
  ): Promise<void> {
    return this.usersService.deleteUser(deleteUserDto, userTokenDataDto);
  }
}
