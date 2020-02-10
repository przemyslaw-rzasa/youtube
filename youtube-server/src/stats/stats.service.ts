import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { UserTokenDataDto } from "src/auth/dto/user-token.dto";

import { StatsRepository } from "./stats.repository";
import { PostFeedbackDto } from "./dto/post-feedback.dto";

@Injectable()
export class StatsService {
  constructor(
    @InjectRepository(StatsRepository) private statsRepository: StatsRepository
  ) {}

  async postFeedback(
    postFeedbackDto: PostFeedbackDto,
    userTokenDataDto: UserTokenDataDto
  ) {
    return await this.statsRepository.postFeedback(
      postFeedbackDto,
      userTokenDataDto
    );
  }
}
