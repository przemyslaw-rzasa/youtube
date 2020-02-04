import { Repository, EntityRepository } from "typeorm";
import { Video } from "./video.entity";
import { CreateVideoDto } from "./dto/create-video.dto";
import { GetVideoDto } from "./dto/get-video.dto";

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

  async createVideo({
    name,
    description,
    fileVideoId,
    channelId
  }: CreateVideoDto) {
    const video = new Video();

    const payload = {
      name,
      description,
      videoFile: fileVideoId,
      channel: channelId
    };

    video.fromData(payload);

    await video.save();

    return video;
  }
}
