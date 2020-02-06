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
  Query,
  Param,
  Req,
  Res
} from "@nestjs/common";
import { VideosService } from "./videos.service";
import { GetUser } from "src/auth/get-user.decorator";
import { AuthGuard } from "@nestjs/passport";
import { CreateVideoDto } from "./dto/create-video.dto";
import { GetVideoDto } from "./dto/get-video.dto";
import { UpdateVideoDto } from "./dto/update-video.dto";
import { UserTokenDataDto } from "src/auth/dto/user-token.dto";
import { DeleteVideoDto } from "./dto/delete-video.dto";
import { Video } from "./video.entity";
import { Response, Request } from "express";

@Controller("videos")
export class VideosController {
  constructor(private videoService: VideosService) {}

  @Get()
  @HttpCode(200)
  @UseGuards(AuthGuard("jwt"))
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
  ) {
    return this.videoService.streamVideo(Number(videoId), req, res);
  }

  @Post()
  @HttpCode(201)
  @UseGuards(AuthGuard("jwt"))
  @UsePipes(new ValidationPipe({ whitelist: true }))
  createVideo(
    @Body() createVideoDto: CreateVideoDto,
    @GetUser() userTokenData: UserTokenDataDto
  ): Promise<Video> {
    return this.videoService.createVideo(createVideoDto, userTokenData);
  }

  @Put()
  @UseGuards(AuthGuard("jwt"))
  @UsePipes(new ValidationPipe({ whitelist: true }))
  updateVideo(
    @Body() updateVideoDto: UpdateVideoDto,
    @GetUser() userTokenData: UserTokenDataDto
  ): Promise<Video> {
    return this.videoService.updateVideo(updateVideoDto, userTokenData);
  }

  @Delete()
  @HttpCode(204)
  @UseGuards(AuthGuard("jwt"))
  @UsePipes(new ValidationPipe({ whitelist: true }))
  deleteVideo(
    @Body() deleteVideoDto: DeleteVideoDto,
    @GetUser() userTokenData: UserTokenDataDto
  ): Promise<void> {
    return this.videoService.deleteVideo(deleteVideoDto, userTokenData);
  }
}
