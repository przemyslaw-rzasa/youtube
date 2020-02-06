import { EntityRepository, Repository } from "typeorm";
import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException
} from "@nestjs/common";

import { User } from "./user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ERROR_CODES } from "src/constants/typeOrm";
import { UserTokenDataDto } from "src/auth/dto/user-token.dto";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async getUser(userTokenData: UserTokenDataDto): Promise<User> {
    const user = await User.findOne(
      { id: userTokenData.id },
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
    const user = new User();

    user.fromData(createUserDto);

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

  async updateUser(userData: UpdateUserDto) {
    const user = await User.findOne({ id: userData.id });

    if (!user) {
      throw new NotFoundException();
    }

    user.fromData(userData);

    try {
      await user.save({
        customOptions: {
          isNew: false,
          passwordChanged: !!userData.password
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

  async deleteUser(id: number) {
    const user = await User.findOne({ id });

    await user.remove();
  }
}
