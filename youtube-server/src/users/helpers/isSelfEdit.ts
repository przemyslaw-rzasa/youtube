import { UserTokenDataDto } from "src/auth/dto/user-token.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { DeleteUserDto } from "../dto/delete-user.dto";

type UserDto = UpdateUserDto | DeleteUserDto;

export const makesSelfEdit = (
  userDto: UserDto,
  userTokenDataDto: UserTokenDataDto
) => userDto.id && userDto.id !== userTokenDataDto.id;
