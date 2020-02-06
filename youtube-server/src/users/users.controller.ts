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
import { UserTokenDataDto } from "src/auth/dto/user-token.dto";

@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard("jwt"))
  getUser(@GetUser() userTokenData: UserTokenDataDto) {
    return this.usersService.getUser(userTokenData);
  }

  @Post()
  @HttpCode(201)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.createUser(createUserDto);
  }

  @Put()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @UseGuards(AuthGuard("jwt"))
  updateUser(
    @Body() updateUserDto: UpdateUserDto,
    @GetUser() userTokenData: UserTokenDataDto
  ): Promise<User> {
    return this.usersService.updateUser(updateUserDto, userTokenData);
  }

  @Delete()
  @HttpCode(204)
  @UseGuards(AuthGuard("jwt"))
  deleteUser(
    @Body() deleteUserDto: DeleteUserDto,
    @GetUser() userTokenData: UserTokenDataDto
  ): Promise<void> {
    return this.usersService.deleteUser(deleteUserDto, userTokenData);
  }
}
