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
import { UserTokenDataDto } from "src/auth/dto/user-token.dto";
import { DeleteVideoDto } from "./dto/delete-video.dto";
import { Response, Request } from "express";

@Injectable()
export class VideosService {
  constructor(
    @InjectRepository(VideoRepository) private videoRepository: VideoRepository
  ) {}

  async getVideo(getVideoDto: GetVideoDto) {
    return await this.videoRepository.getVideo(getVideoDto);
  }

  async streamVideo(videoId: number, req: Request, res: Response) {
    const videoData = await Video.findOne(
      { id: videoId },
      { relations: ["videoFile"] }
    );

    if (!videoData) {
      throw new NotFoundException("Video not found");
    }

    const { filename } = videoData.videoFile;

    const videoFilePath = join(publicPath, "videos", filename);

    const stats: fs.Stats = await new Promise((resolve, reject) => {
      fs.stat(videoFilePath, (err, stats) => {
        if (err) {
          reject(err);
        }

        resolve(stats);
      });
    });

    const { range } = req.headers;

    if (range) {
      const parts = range
        .replace("bytes=", "")
        .split("-")
        .filter(Boolean);

      const start = Number(parts[0]);
      const end = parts[1] ? Number(parts[1]) : stats.size;

      const chunkSize = end - start + 1;

      const file = fs.createReadStream(videoFilePath, { start, end });

      res.setHeader("Content-Range", `bytes ${start}-${end}/${stats.size}`);
      res.setHeader("Accept-Range", "bytes");
      res.setHeader("Content-Length", chunkSize);
      res.setHeader("Content-Type", "video/mp4");

      file.pipe(res);
    } else {
      res.setHeader("Content-Length", stats.size);
      res.setHeader("Content-Type", "video/mp4");

      fs.createReadStream(videoFilePath).pipe(res);
    }
  }

  async createVideo(
    createVideoDto: CreateVideoDto,
    userTokenData: UserTokenDataDto
  ) {
    const { channelId, fileVideoId } = createVideoDto;

    const isAdmin = userTokenData.role === Role.ADMIN;

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
    if (!isAdmin && userTokenData.id !== channel.user.id) {
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
    if (!isAdmin && userTokenData.id !== videoData.user.id) {
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
        userTokenData
      );

      return video;
    } else {
      throw new NotFoundException("Video file not found");
    }
  }

  async updateVideo(
    updateVideoDto: UpdateVideoDto,
    userTokenData: UserTokenDataDto
  ) {
    const { id } = updateVideoDto;

    const isAdmin = userTokenData.role === Role.ADMIN;

    const video = await Video.findOne({ id }, { relations: ["user"] });

    if (!video) {
      throw new NotFoundException("Video not found");
    }

    // Check user rights to channel
    if (!isAdmin && userTokenData.id !== video.user.id) {
      throw new MethodNotAllowedException();
    }

    const newVideo = await this.videoRepository.updateVideo(updateVideoDto);

    return newVideo;
  }

  async deleteVideo(
    deleteVideoDto: DeleteVideoDto,
    userTokenData: UserTokenDataDto
  ): Promise<void> {
    const { id } = deleteVideoDto;

    const isAdmin = userTokenData.role === Role.ADMIN;

    const video = await Video.findOne({ id }, { relations: ["user"] });

    if (!video) {
      throw new NotFoundException("Video not found");
    }

    // Check user rights to channel
    if (!isAdmin && userTokenData.id !== video.user.id) {
      throw new MethodNotAllowedException();
    }

    await this.videoRepository.deleteVideo(deleteVideoDto);
  }
}
