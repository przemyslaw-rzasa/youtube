import {
  Controller,
  Post,
  Body,
  HttpCode,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Get,
  Put
} from "@nestjs/common";
import { VideosService } from "./videos.service";
import { GetUser } from "src/auth/get-user.decorator";
import { AuthGuard } from "@nestjs/passport";
import { CreateVideoDto } from "./dto/create-video.dto";
import { GetVideoDto } from "./dto/get-video.dto";
import { UpdateVideoDto } from "./dto/update-video.dto";

@Controller("videos")
export class VideosController {
  constructor(private videoService: VideosService) {}

  @Get()
  @HttpCode(200)
  @UseGuards(AuthGuard("jwt"))
  @UsePipes(new ValidationPipe({ whitelist: true }))
  getVideo(@Body() getVideoDto: GetVideoDto, @GetUser() user): any {
    return this.videoService.getVideo(getVideoDto, user);
  }

  @Post()
  @HttpCode(201)
  @UseGuards(AuthGuard("jwt"))
  @UsePipes(new ValidationPipe({ whitelist: true }))
  createVideo(@Body() createVideoDto: CreateVideoDto, @GetUser() user): any {
    return this.videoService.createVideo(createVideoDto, user);
  }

  @Put()
  @UseGuards(AuthGuard("jwt"))
  @UsePipes(new ValidationPipe({ whitelist: true }))
  updateVideo(@Body() updateVideoDto: UpdateVideoDto, @GetUser() user): any {
    return this.videoService.updateVideo(updateVideoDto, user);
  }
}
