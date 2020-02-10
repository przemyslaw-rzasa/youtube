import {
  Injectable,
  NotFoundException,
  MethodNotAllowedException
} from "@nestjs/common";
import { CreateVideoDto } from "./dto/create-video.dto";
import { Role } from "src/users/user.entity";
import { Channel } from "src/channels/channel.entity";
import * as fs from "fs";
import { join } from "path";
import { InjectRepository } from "@nestjs/typeorm";
import { VideoRepository } from "./video.repository";
import { File, FileHost } from "src/files/file.entity";
import { GetVideoDto } from "./dto/get-video.dto";
import { UpdateVideoDto } from "./dto/update-video.dto";
import { Video } from "./video.entity";
import { UserTokenDataDto } from "src/auth/dto/user-token.dto";
import { DeleteVideoDto } from "./dto/delete-video.dto";
import { Response, Request } from "express";
import { PUBLIC_VIDEOS_PATH } from "src/constants";
import { isAdmin } from "src/utils/helpers/isAdmin";
import { isVideoOwner } from "./helpers/isVideoOwner";

@Injectable()
export class VideosService {
  constructor(
    @InjectRepository(VideoRepository) private videoRepository: VideoRepository
  ) {}

  async getVideo(getVideoDto: GetVideoDto): Promise<Video> {
    return await this.videoRepository.getVideo(getVideoDto);
  }

  async streamVideo(
    videoId: number,
    req: Request,
    res: Response
  ): Promise<void> {
    const videoData = await Video.findOne(
      { id: videoId },
      { relations: ["videoFile"] }
    );

    if (!videoData) {
      throw new NotFoundException("Video not found");
    }

    const { filename } = videoData.videoFile;

    const videoFilePath = join(PUBLIC_VIDEOS_PATH, filename);

    const fileStats: fs.Stats = await new Promise((resolve, reject) => {
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
      const end = parts[1] ? Number(parts[1]) : fileStats.size;

      const chunkSize = end - start + 1;

      const file = fs.createReadStream(videoFilePath, { start, end });

      res.setHeader("Content-Range", `bytes ${start}-${end}/${fileStats.size}`);
      res.setHeader("Accept-Range", "bytes");
      res.setHeader("Content-Length", chunkSize);
      res.setHeader("Content-Type", "video/mp4");

      file.pipe(res);
    } else {
      res.setHeader("Content-Length", fileStats.size);
      res.setHeader("Content-Type", "video/mp4");

      fs.createReadStream(videoFilePath).pipe(res);
    }
  }

  async createVideo(
    createVideoDto: CreateVideoDto,
    userTokenDataDto: UserTokenDataDto
  ): Promise<Video> {
    const { channelId, fileVideoId } = createVideoDto;

    const isAdmin = userTokenDataDto.role === Role.ADMIN;

    const channel = await Channel.findOne(
      { id: channelId },
      {
        relations: ["user"]
      }
    );

    // Check, if channel even exists
    if (!channel) {
      throw new NotFoundException("Channel not found");
    }

    // Check user rights to channel
    if (!isAdmin && userTokenDataDto.id !== channel.user.id) {
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
    if (!isAdmin && userTokenDataDto.id !== videoData.user.id) {
      throw new MethodNotAllowedException();
    }

    // Check if file exists
    const fileExists = await new Promise(resolve => {
      if (videoData.host === FileHost.LOCAL) {
        fs.access(
          join(PUBLIC_VIDEOS_PATH, videoData.filename),
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

    if (fileExists) {
      const video = await this.videoRepository.createVideo(
        createVideoDto,
        userTokenDataDto
      );

      return video;
    } else {
      throw new NotFoundException("Video file not found");
    }
  }

  async updateVideo(
    updateVideoDto: UpdateVideoDto,
    userTokenDataDto: UserTokenDataDto
  ): Promise<Video> {
    const { id } = updateVideoDto;

    const video = await Video.findOne({ id }, { relations: ["user"] });

    // Check, if video exists
    if (!video) {
      throw new NotFoundException("Video not found");
    }

    // Check user rights to channel
    if (!isAdmin(userTokenDataDto) && isVideoOwner(video, userTokenDataDto)) {
      throw new MethodNotAllowedException();
    }

    return await this.videoRepository.updateVideo(updateVideoDto);
  }

  async deleteVideo(
    deleteVideoDto: DeleteVideoDto,
    userTokenDataDto: UserTokenDataDto
  ): Promise<void> {
    const { id } = deleteVideoDto;

    const video = await Video.findOne({ id }, { relations: ["user"] });

    if (!video) {
      throw new NotFoundException("Video not found");
    }

    // Check user rights to channel
    if (!isAdmin(userTokenDataDto) && !isVideoOwner(video, userTokenDataDto)) {
      throw new MethodNotAllowedException();
    }

    await this.videoRepository.deleteVideo(deleteVideoDto);
  }
}
