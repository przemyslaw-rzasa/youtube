import {
  Controller,
  Post,
  Body,
  HttpCode,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Get,
  Put,
  Delete,
  Param,
  Req,
  Res
} from "@nestjs/common";
import { Response, Request } from "express";
import { AuthGuard } from "@nestjs/passport";

import { GetUser } from "src/auth/get-user.decorator";
import { UserTokenDataDto } from "src/auth/dto/user-token.dto";

import { VideosService } from "./videos.service";
import { Video } from "./video.entity";
import { CreateVideoDto } from "./dto/create-video.dto";
import { GetVideoDto } from "./dto/get-video.dto";
import { UpdateVideoDto } from "./dto/update-video.dto";
import { DeleteVideoDto } from "./dto/delete-video.dto";

@Controller("videos")
export class VideosController {
  constructor(private videoService: VideosService) {}

  @Get()
  @HttpCode(200)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  getVideo(@Body() getVideoDto: GetVideoDto): Promise<Video> {
    return this.videoService.getVideo(getVideoDto);
  }

  @Get("/:videoId")
  @HttpCode(200)
  streamVideo(
    @Param("videoId") videoId: string,
    @Req() req: Request,
    @Res() res: Response
  ): Promise<void> {
    return this.videoService.streamVideo(Number(videoId), req, res);
  }

  @Post()
  @HttpCode(201)
  @UseGuards(AuthGuard("jwt"))
  @UsePipes(new ValidationPipe({ whitelist: true }))
  createVideo(
    @Body() createVideoDto: CreateVideoDto,
    @GetUser() userTokenDataDto: UserTokenDataDto
  ): Promise<Video> {
    return this.videoService.createVideo(createVideoDto, userTokenDataDto);
  }

  @Put()
  @UseGuards(AuthGuard("jwt"))
  @UsePipes(new ValidationPipe({ whitelist: true }))
  updateVideo(
    @Body() updateVideoDto: UpdateVideoDto,
    @GetUser() userTokenDataDto: UserTokenDataDto
  ): Promise<Video> {
    return this.videoService.updateVideo(updateVideoDto, userTokenDataDto);
  }

  @Delete()
  @HttpCode(204)
  @UseGuards(AuthGuard("jwt"))
  @UsePipes(new ValidationPipe({ whitelist: true }))
  deleteVideo(
    @Body() deleteVideoDto: DeleteVideoDto,
    @GetUser() userTokenDataDto: UserTokenDataDto
  ): Promise<void> {
    return this.videoService.deleteVideo(deleteVideoDto, userTokenDataDto);
  }
}
