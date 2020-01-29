import { EntityRepository, Repository } from "typeorm";
import * as bcrypt from "bcryptjs";

import { User } from "./user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { AuthUserDto } from "./dto/auth-user.dto";
import {
  ConflictException,
  InternalServerErrorException
} from "@nestjs/common";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async validateUser(authUserDto: AuthUserDto): Promise<User> {
    const { email, password } = authUserDto;

    const user = await this.findOne({ email });

    if (user && (await user.validatePassword(password))) {
      return user;
    }

    return null;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    const salt = await bcrypt.genSalt();

    user.email = createUserDto.email;
    user.salt = salt;
    user.password = await bcrypt.hash(createUserDto.password, salt);

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
}
