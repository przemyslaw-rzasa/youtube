import { Injectable, MethodNotAllowedException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "./users.repository";
import { User, Role } from "./user.entity";
import { UpdateUserDto } from "./dto/update-user.dto";
import { DeleteUserDto } from "./dto/delete-user.dto";
import { UserTokenDataDto } from "src/auth/dto/user-token.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository
  ) {}

  async getUser(userTokenData: UserTokenDataDto): Promise<User> {
    return await this.userRepository.getUser(userTokenData);
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    return await this.userRepository.createUser(createUserDto);
  }

  async updateUser(
    updateUserDto: UpdateUserDto,
    userTokenData: UserTokenDataDto
  ) {
    const updatesForeignUser =
      updateUserDto.id && updateUserDto.id !== userTokenData.id;
    const isAdmin = userTokenData.role === Role.ADMIN;

    if (updatesForeignUser) {
      if (!isAdmin) {
        throw new MethodNotAllowedException();
      }
    }

    const newUserData = {
      id: updatesForeignUser ? updateUserDto.id : userTokenData.id,
      ...updateUserDto
    };

    return await this.userRepository.updateUser(newUserData);
  }

  async deleteUser(
    deleteUserDto: DeleteUserDto,
    userTokenData: UserTokenDataDto
  ): Promise<void> {
    const deletesForeignUser =
      deleteUserDto.id && deleteUserDto.id !== userTokenData.id;
    const isAdmin = userTokenData.role === Role.ADMIN;

    if (deletesForeignUser) {
      if (!isAdmin) {
        throw new MethodNotAllowedException();
      }
    }

    const id = deletesForeignUser ? deleteUserDto.id : userTokenData.id;

    return await this.userRepository.deleteUser(id);
  }

  async findOne(...data): Promise<User> {
    return this.userRepository.findOne(...data);
  }
}
