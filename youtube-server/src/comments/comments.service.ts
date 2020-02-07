import {
  Injectable,
  NotFoundException,
  MethodNotAllowedException
} from "@nestjs/common";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UserTokenDataDto } from "src/auth/dto/user-token.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { CommentsRepository } from "./comments.repository";
import { Video } from "src/videos/video.entity";
import { DeleteCommentDto } from "./dto/delete-comment.dto";
import { Comment } from "./comment.entity";
import { isAdmin } from "src/utils/helpers/isAdmin";
import { isCommentOwner } from "./helpers/isCommentOwner";

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentsRepository)
    private commentsRepository: CommentsRepository
  ) {}

  async createComment(
    createCommentDto: CreateCommentDto,
    userTokenDataDto: UserTokenDataDto
  ): Promise<Comment> {
    const video = await Video.findOne({ id: createCommentDto.videoId });

    if (!video) {
      throw new NotFoundException("Video not found");
    }

    return await this.commentsRepository.createComment(
      createCommentDto,
      userTokenDataDto
    );
  }

  async deleteComment(
    deleteCommentDto: DeleteCommentDto,
    userTokenDataDto: UserTokenDataDto
  ) {
    const comment = await Comment.findOne(
      { id: deleteCommentDto.id },
      { relations: ["user"] }
    );

    if (
      !isCommentOwner(comment, userTokenDataDto) &&
      !isAdmin(userTokenDataDto)
    ) {
      throw new MethodNotAllowedException();
    }

    if (!comment) {
      throw new NotFoundException("Comment not found");
    }

    return await this.commentsRepository.deleteComment(deleteCommentDto);
  }
}
