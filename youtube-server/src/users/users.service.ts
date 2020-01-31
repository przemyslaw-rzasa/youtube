import { Injectable, MethodNotAllowedException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "./users.repository";
import { User, Role } from "./user.entity";
import { UpdateUserDto } from "./dto/update-user.dto";
import { DeleteUserDto } from "./dto/delete-user.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    return await this.userRepository.createUser(createUserDto);
  }

  async updateUser(updateUserDto: UpdateUserDto, user: User) {
    const updatesForeignUser = updateUserDto.id && updateUserDto.id !== user.id;
    const isAdmin = user.role === Role.ADMIN;

    if (updatesForeignUser) {
      if (!isAdmin) {
        throw new MethodNotAllowedException();
      }
    }

    const newUserData = {
      id: updatesForeignUser ? updateUserDto.id : user.id,
      ...updateUserDto
    };

    return await this.userRepository.updateUser(newUserData);
  }

  async deleteUser(deleteUserDto: DeleteUserDto, user: User) {
    const deletesForeignUser = deleteUserDto.id && deleteUserDto.id !== user.id;
    const isAdmin = user.role === Role.ADMIN;

    if (deletesForeignUser) {
      if (!isAdmin) {
        throw new MethodNotAllowedException();
      }
    }

    const id = deletesForeignUser ? deleteUserDto.id : user.id;

    return await this.userRepository.deleteUser(id);
  }

  async findOne(...data) {
    return this.userRepository.findOne(...data);
  }
}
