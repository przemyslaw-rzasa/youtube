import {
  Controller,
  Post,
  Body,
  HttpCode,
  UsePipes,
  ValidationPipe,
  UseGuards
} from "@nestjs/common";
import { VideosService } from "./videos.service";
import { GetUser } from "src/auth/get-user.decorator";
import { AuthGuard } from "@nestjs/passport";

@Controller("videos")
export class VideosController {
  constructor(private videoService: VideosService) {}

  @Post()
  @HttpCode(201)
  @UseGuards(AuthGuard("jwt"))
  @UsePipes(ValidationPipe)
  createVideo(@Body() createVideoDto, @GetUser() user): any {
    return this.videoService.createVideo(createVideoDto, user);
  }
}
