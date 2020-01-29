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
    // @todo: Move to entity
    const user = new User();
    const salt = await bcrypt.genSalt();

    user.email = createUserDto.email;
    user.salt = salt;
    user.password = await bcrypt.hash(createUserDto.password, salt);
    // -----------------------

    try {
      await user.save();
    } catch (error) {
      if (error.code === "23505") {
        throw new ConflictException("User with this email already exists");
      }

      throw new InternalServerErrorException();
    }

    // Delete user sensitive data
    delete user.salt;
    delete user.password;

    return user;
  }

  async updateUser(updateUserDto: CreateUserDto) {}
}
