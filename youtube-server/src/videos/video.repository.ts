import { Repository, EntityRepository, getConnection } from "typeorm";

import { UserTokenDataDto } from "src/auth/dto/user-token.dto";

import { Video } from "./video.entity";
import { CreateVideoDto } from "./dto/create-video.dto";
import { GetVideoDto } from "./dto/get-video.dto";
import { UpdateVideoDto } from "./dto/update-video.dto";
import { DeleteVideoDto } from "./dto/delete-video.dto";
import { Stat, Thumb } from "src/stats/stat.entity";

@EntityRepository(Video)
export class VideoRepository extends Repository<Video> {
  async getVideo({ id }: GetVideoDto) {
    // @todo: Move to the View Entity
    const thumbsUpCount = await getConnection()
      .getRepository(Stat)
      .createQueryBuilder("stat")
      .where("stat.video = :videoId AND stat.thumb = :thumb", {
        videoId: id,
        thumb: Thumb.UP
      })
      .getCount();

    const thumbsDownCount = await getConnection()
      .getRepository(Stat)
      .createQueryBuilder("stat")
      .where("stat.video = :videoId AND stat.thumb = :thumb", {
        videoId: id,
        thumb: Thumb.DOWN
      })
      .getCount();

    const video = await Video.findOne(
      { id },
      {
        relations: ["channel", "videoFile", "comments"]
      }
    );

    video.thumbs = {
      up: thumbsUpCount,
      down: thumbsDownCount
    };

    return video;
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

    return await video.save();
  }

  async updateVideo({ id, ...manageableData }: UpdateVideoDto): Promise<Video> {
    const video = await Video.findOne({ id });

    video.fromData(manageableData);

    return await video.save();
  }

  async deleteVideo({ id }: DeleteVideoDto): Promise<void> {
    // "videoFile" relation required for inner @BeforeRemove handler
    const video = await Video.findOne({ id }, { relations: ["videoFile"] });

    await video.remove();
  }
}
