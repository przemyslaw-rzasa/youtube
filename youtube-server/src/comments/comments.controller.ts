import {
  Controller,
  Post,
  UseGuards,
  Body,
  HttpCode,
  UsePipes,
  ValidationPipe,
  Delete
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

import { GetUser } from "src/auth/get-user.decorator";
import { UserTokenDataDto } from "src/auth/dto/user-token.dto";

import { CommentsService } from "./comments.service";
import { Comment } from "./comment.entity";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { DeleteCommentDto } from "./dto/delete-comment.dto";

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

  @Delete()
  @HttpCode(204)
  @UseGuards(AuthGuard("jwt"))
  @UsePipes(new ValidationPipe({ whitelist: true }))
  deleteComment(
    @Body() deleteCommentDto: DeleteCommentDto,
    @GetUser() userTokenDataDto: UserTokenDataDto
  ): Promise<void> {
    return this.commentsService.deleteComment(
      deleteCommentDto,
      userTokenDataDto
    );
  }
}
