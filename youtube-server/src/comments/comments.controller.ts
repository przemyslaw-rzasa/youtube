import {
  Controller,
  Post,
  UseGuards,
  Body,
  HttpCode,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { GetUser } from "src/auth/get-user.decorator";
import { UserTokenDataDto } from "src/auth/dto/user-token.dto";
import { CommentsService } from "./comments.service";
import { Comment } from "./comment.entity";

@Controller("comments")
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Post()
  @HttpCode(201)
  @UseGuards(AuthGuard("jwt"))
  @UsePipes(new ValidationPipe({ whitelist: true }))
  createComment(
    @Body() createCommentDto: CreateCommentDto,
    @GetUser() userTokenDataDto: UserTokenDataDto
  ): Promise<Comment> {
    return this.commentsService.createComment(
      createCommentDto,
      userTokenDataDto
    );
  }
}
