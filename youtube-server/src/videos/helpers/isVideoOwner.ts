import { UserTokenDataDto } from "src/auth/dto/user-token.dto";
import { Video } from "../video.entity";

export const isVideoOwner = (
  video: Video,
  userDataTokenDto: UserTokenDataDto
) => userDataTokenDto.id === video.user.id;
