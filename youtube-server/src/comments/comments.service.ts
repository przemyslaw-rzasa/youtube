import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UserTokenDataDto } from "src/auth/dto/user-token.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { CommentsRepository } from "./comments.repository";
import { Video } from "src/videos/video.entity";

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentsRepository)
    private commentsRepository: CommentsRepository
  ) {}

  async createComment(
    createCommentDto: CreateCommentDto,
    userTokenDataDto: UserTokenDataDto
  ) {
    const video = await Video.findOne({ id: createCommentDto.videoId });

    if (!video) {
      throw new NotFoundException("Video not found");
    }

    return await this.commentsRepository.createComment(
      createCommentDto,
      userTokenDataDto
    );
  }
}
