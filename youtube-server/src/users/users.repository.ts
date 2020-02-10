import { EntityRepository, Repository } from "typeorm";
import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException
} from "@nestjs/common";

import { ERROR_CODES } from "src/constants/typeOrm";
import { UserTokenDataDto } from "src/auth/dto/user-token.dto";

import { User, SensitiveUser } from "./user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async getUser(userTokenDataDto: UserTokenDataDto): Promise<SensitiveUser> {
    const user = await User.findOne(
      { id: userTokenDataDto.id },
      {
        relations: ["channels"]
      }
    );

    if (!user) {
      throw new NotFoundException("User does not exists");
    }

    return user.insensitiveData;
  }

  async createUser(createUserDto: CreateUserDto): Promise<SensitiveUser> {
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

    return user.insensitiveData;
  }

  async updateUser(updateUserDto: UpdateUserDto): Promise<SensitiveUser> {
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

      return user.insensitiveData;
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
