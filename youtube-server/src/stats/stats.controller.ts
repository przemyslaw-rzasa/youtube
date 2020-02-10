import {
  Controller,
  Post,
  UseGuards,
  HttpCode,
  UsePipes,
  ValidationPipe,
  Body
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

import { StatsService } from "./stats.service";
import { Stat } from "./stat.entity";
import { PostFeedbackDto } from "./dto/post-feedback.dto";
import { GetUser } from "src/auth/get-user.decorator";
import { UserTokenDataDto } from "src/auth/dto/user-token.dto";

@Controller("stats")
export class StatsController {
  constructor(private statsService: StatsService) {}

  @Post()
  @HttpCode(201)
  @UseGuards(AuthGuard("jwt"))
  @UsePipes(new ValidationPipe({ whitelist: true }))
  postFeedback(
    @Body() postFeedbackDto: PostFeedbackDto,
    @GetUser() userTokenDataDto: UserTokenDataDto
  ): Promise<Stat> {
    return this.statsService.postFeedback(postFeedbackDto, userTokenDataDto);
  }
}
