import { Repository, EntityRepository } from "typeorm";

import { File } from "src/files/file.entity";
import { UserTokenDataDto } from "src/auth/dto/user-token.dto";

import { Video } from "./video.entity";
import { CreateVideoDto } from "./dto/create-video.dto";
import { GetVideoDto } from "./dto/get-video.dto";
import { UpdateVideoDto } from "./dto/update-video.dto";
import { DeleteVideoDto } from "./dto/delete-video.dto";

@EntityRepository(Video)
export class VideoRepository extends Repository<Video> {
  async getVideo({ id }: GetVideoDto) {
    return await Video.findOne(
      { id },
      {
        relations: ["channel", "videoFile"]
      }
    );
  }

  async createVideo(
    { title, description, fileVideoId, channelId }: CreateVideoDto,
    userTokenDataDto: UserTokenDataDto
  ) {
    const video = new Video();

    const payload = {
      title,
      description,
      videoFile: fileVideoId,
      channel: channelId,
      user: userTokenDataDto.id
    };

    video.fromData(payload);

    await video.save();

    // @todo: Find better way, to pass video instance to videoFile
    const videoFile = await File.findOne({ id: fileVideoId });

    videoFile.video = video;

    await videoFile.save();

    return video;
  }

  async updateVideo({ id, ...manageableData }: UpdateVideoDto): Promise<Video> {
    const video = await Video.findOne({ id });

    video.fromData(manageableData);

    return await video.save();
  }

  async deleteVideo({ id }: DeleteVideoDto): Promise<void> {
    const video = await Video.findOne({ id }, { relations: ["videoFile"] });

    await video.remove();
  }
}
