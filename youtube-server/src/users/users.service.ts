import { Injectable, MethodNotAllowedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { UserTokenDataDto } from "src/auth/dto/user-token.dto";
import { isAdmin } from "src/utils/helpers/isAdmin";

import { CreateUserDto } from "./dto/create-user.dto";
import { UserRepository } from "./users.repository";
import { User } from "./user.entity";
import { UpdateUserDto } from "./dto/update-user.dto";
import { DeleteUserDto } from "./dto/delete-user.dto";
import { makesSelfEdit } from "./helpers/isSelfEdit";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository
  ) {}

  async getUser(userTokenDataDto: UserTokenDataDto): Promise<User> {
    return await this.userRepository.getUser(userTokenDataDto);
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    return await this.userRepository.createUser(createUserDto);
  }

  async updateUser(
    updateUserDto: UpdateUserDto,
    userTokenDataDto: UserTokenDataDto
  ): Promise<User> {
    const selfEdit = makesSelfEdit(updateUserDto, userTokenDataDto);

    if (!selfEdit && !isAdmin(userTokenDataDto)) {
      throw new MethodNotAllowedException();
    }

    const newUserData = {
      id: selfEdit ? userTokenDataDto.id : updateUserDto.id,
      ...updateUserDto
    };

    return await this.userRepository.updateUser(newUserData);
  }

  async deleteUser(
    deleteUserDto: DeleteUserDto,
    userTokenDataDto: UserTokenDataDto
  ): Promise<void> {
    const selfDeletion = makesSelfEdit(deleteUserDto, userTokenDataDto);

    if (!selfDeletion && !isAdmin(userTokenDataDto)) {
      throw new MethodNotAllowedException();
    }

    const id = selfDeletion ? userTokenDataDto.id : deleteUserDto.id;

    return await this.userRepository.deleteUser(id);
  }

  async findOne(...data): Promise<User> {
    return this.userRepository.findOne(...data);
  }
}
