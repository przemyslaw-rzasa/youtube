import { Repository, EntityRepository } from "typeorm";

import { UserTokenDataDto } from "src/auth/dto/user-token.dto";

import { CreateCommentDto } from "./dto/create-comment.dto";
import { Comment } from "./comment.entity";
import { DeleteCommentDto } from "./dto/delete-comment.dto";

@EntityRepository(Comment)
export class CommentsRepository extends Repository<Comment> {
  async createComment(
    { videoId, content }: CreateCommentDto,
    userTokenDataDto: UserTokenDataDto
  ): Promise<Comment> {
    const comment = new Comment({
      video: videoId,
      user: userTokenDataDto.id,
      content
    });

    return comment.save();
  }

  async deleteComment({ id }: DeleteCommentDto): Promise<void> {
    const comment = await Comment.findOne({ id });

    await comment.remove();
  }
}
