import { Comment } from "../comment.entity";
import { UserTokenDataDto } from "src/auth/dto/user-token.dto";

export const isCommentOwner = (
  comment: Comment,
  userTokenDataDto: UserTokenDataDto
) => userTokenDataDto.id === comment.user.id;
