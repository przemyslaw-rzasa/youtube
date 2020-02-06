import { Repository, EntityRepository } from "typeorm";
import { UserTokenDataDto } from "src/auth/dto/user-token.dto";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { Comment } from "./comment.entity";

@EntityRepository(Comment)
export class CommentsRepository extends Repository<Comment> {
  async createComment(
    { videoId, content }: CreateCommentDto,
    userTokenDataDto: UserTokenDataDto
  ) {
    const comment = new Comment({
      video: videoId,
      content
    });

    return comment.save();
  }
}
