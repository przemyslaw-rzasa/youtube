import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "./users.repository";
import { AuthUserDto } from "./dto/auth-user.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    return await this.userRepository.createUser(createUserDto);
  }

  async singIn(authUserDto: AuthUserDto) {
    const user = await this.userRepository.validateUser(authUserDto);

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }
}
