import { Channel } from "../channel.entity";
import { UserTokenDataDto } from "src/auth/dto/user-token.dto";

export const isChannelOwner = (
  channel: Channel,
  userTokenDataDto: UserTokenDataDto
) => userTokenDataDto.id === channel.user.id;
