import {
  Injectable,
  NotFoundException,
  MethodNotAllowedException
} from "@nestjs/common";
import { CreateVideoDto } from "./dto/create-video.dto";
import { User, Role } from "src/users/user.entity";
import { Channel } from "src/channels/channel.entity";
import * as fs from "fs";
import { join } from "path";
import { InjectRepository } from "@nestjs/typeorm";
import { VideoRepository } from "./video.repository";
import { File, FileHost } from "src/files/file.entity";
import { publicPath } from "src/app.module";
import { GetVideoDto } from "./dto/get-video.dto";
import { UpdateVideoDto } from "./dto/update-video.dto";
import { Video } from "./video.entity";

@Injectable()
export class VideosService {
  constructor(
    @InjectRepository(VideoRepository) private videoRepository: VideoRepository
  ) {}

  async getVideo(getVideoDto: GetVideoDto, user: User) {
    return await this.videoRepository.getVideo(getVideoDto);
  }

  async createVideo(createVideoDto: CreateVideoDto, user: User) {
    const { channelId, fileVideoId } = createVideoDto;

    const isAdmin = user.role === Role.ADMIN;

    // Check if channel exists
    const channel = await Channel.findOne(
      { id: channelId },
      {
        relations: ["user"]
      }
    );

    if (!channel) {
      throw new NotFoundException("Channel not found");
    }

    // Check user rights to channel
    if (!isAdmin && user.id !== channel.user.id) {
      throw new MethodNotAllowedException();
    }

    // Check if video exists
    const videoData = await File.findOne(
      { id: fileVideoId },
      { relations: ["user"] }
    );

    if (!videoData) {
      throw new NotFoundException("Video file not found");
    }

    // Check user rights to channel
    if (!isAdmin && user.id !== videoData.user.id) {
      throw new MethodNotAllowedException();
    }

    // Check if file exists
    const doesFileExists = () =>
      new Promise((resolve, reject) => {
        if (videoData.host === FileHost.LOCAL) {
          fs.access(
            join(publicPath, "videos", videoData.filename),
            fs.constants.F_OK,
            async err => {
              if (err) {
                resolve(false);
              }

              return resolve(true);
            }
          );
        }
      });

    const fileExists = await doesFileExists();

    if (fileExists) {
      const video = await this.videoRepository.createVideo(
        createVideoDto,
        user
      );

      return video;
    } else {
      throw new NotFoundException("Video file not found");
    }
  }

  async updateVideo(updateVideoDto: UpdateVideoDto, user: User) {
    const { id } = updateVideoDto;

    const isAdmin = user.role === Role.ADMIN;

    const video = await Video.findOne({ id }, { relations: ["user"] });

    if (!video) {
      throw new NotFoundException("Video not found");
    }

    // Check user rights to channel
    if (!isAdmin && user.id !== video.user.id) {
      throw new MethodNotAllowedException();
    }

    const newVideo = await this.videoRepository.updateVideo(updateVideoDto);

    return newVideo;
  }
}
