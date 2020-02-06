import { EntityRepository, Repository } from "typeorm";
import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException
} from "@nestjs/common";

import { ERROR_CODES } from "src/constants/typeOrm";
import { UserTokenDataDto } from "src/auth/dto/user-token.dto";

import { User } from "./user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async getUser(userTokenDataDto: UserTokenDataDto): Promise<User> {
    const user = await User.findOne(
      { id: userTokenDataDto.id },
      {
        relations: ["channels"]
      }
    );

    if (!user) {
      throw new NotFoundException("User does not exists");
    }

    delete user.password;
    delete user.salt;

    return user;
  }
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = new User(createUserDto);

    try {
      await user.save({
        customOptions: {
          isNew: true
        }
      });
    } catch (error) {
      if (error.code === ERROR_CODES.CONFLICT) {
        throw new ConflictException("User with this email already exists");
      }

      throw new InternalServerErrorException();
    }

    delete user.password;
    delete user.salt;

    return user;
  }

  async updateUser(updateUserDto: UpdateUserDto): Promise<User> {
    const user = await User.findOne({ id: updateUserDto.id });

    if (!user) {
      throw new NotFoundException();
    }

    user.fromData(updateUserDto);

    try {
      await user.save({
        customOptions: {
          isNew: false,
          passwordChanged: !!updateUserDto.password
        }
      });

      delete user.password;
      delete user.salt;

      return user;
    } catch (error) {
      if (error.code === ERROR_CODES.CONFLICT) {
        throw new ConflictException("User with this email already exists");
      }

      throw new InternalServerErrorException();
    }
  }

  async deleteUser(id: number): Promise<void> {
    const user = await User.findOne({ id });

    await user.remove();
  }
}
