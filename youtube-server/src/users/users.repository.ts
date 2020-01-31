import { EntityRepository, Repository } from "typeorm";
import * as bcrypt from "bcryptjs";
import {
  ConflictException,
  InternalServerErrorException
} from "@nestjs/common";

import { User } from "./user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ERROR_CODES } from "src/constants/typeOrm";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();

    user.fromData(createUserDto);

    try {
      await user.create();
    } catch (error) {
      if (error.code === ERROR_CODES.CONFLICT) {
        throw new ConflictException("User with this email already exists");
      }

      throw new InternalServerErrorException();
    }

    return user;
  }

  async updateUser(userData: UpdateUserDto) {
    const user = await User.findOne({ id: userData.id });

    user.fromData(userData);

    await user.update({
      passwordChanged: !!userData.password
    });

    return user;
  }
}
