import { EntityRepository, Repository } from "typeorm";
import * as bcrypt from "bcryptjs";
import {
  ConflictException,
  InternalServerErrorException
} from "@nestjs/common";

import { User } from "./user.entity";
import { CreateUserDto } from "./dto/create-user.dto";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();

    user.fromData(createUserDto);

    try {
      await user.create();
    } catch (error) {
      if (error.code === "23505") {
        throw new ConflictException("User with this email already exists");
      }

      throw new InternalServerErrorException();
    }

    return user;
  }

  async updateUser(updateUserDto: CreateUserDto) {}
}
