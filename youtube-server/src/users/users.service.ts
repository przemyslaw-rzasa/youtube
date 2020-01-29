import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "./users.repository";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    return await this.userRepository.createUser(createUserDto);
  }

  async updateUser(updateUserDto: CreateUserDto) {
    return await this.userRepository.updateUser(updateUserDto);
  }

  async findOne(...data) {
    return this.userRepository.findOne(...data);
  }
}
