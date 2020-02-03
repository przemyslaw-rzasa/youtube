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

@Injectable()
export class VideosService {
  constructor(
    @InjectRepository(VideoRepository) private videoRepository: VideoRepository
  ) {}

  async createVideo(createVideoDto: CreateVideoDto, user: User) {
    const { channelId } = createVideoDto;

    const channel = await Channel.findOne(
      { id: channelId },
      {
        relations: ["user"]
      }
    );

    if (!channel) {
      throw new NotFoundException("Channel not found");
    }

    fs.access(
      join(process.cwd(), "public", "videos"),
      fs.constants.F_OK,
      err => {
        if (err) {
          throw new NotFoundException("Video file not found");
        }

        const isAdmin = user.role === Role.ADMIN;

        if (!isAdmin && user.id !== channel.user.id) {
          throw new MethodNotAllowedException();
        }

        return this.videoRepository.createVideo(createVideoDto);
      }
    );
  }
}
