import { Repository, EntityRepository } from "typeorm";
import { Video } from "./video.entity";
import { CreateVideoDto } from "./dto/create-video.dto";
import { GetVideoDto } from "./dto/get-video.dto";
import { File } from "src/files/file.entity";
import { UpdateVideoDto } from "./dto/update-video.dto";
import { User } from "src/users/user.entity";

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
    user: User
  ) {
    const video = new Video();

    const payload = {
      title,
      description,
      videoFile: fileVideoId,
      channel: channelId,
      user: user.id
    };

    video.fromData(payload);

    await video.save();

    // @todo: Find better way, to pass video instance to videoFile
    const videoFile = await File.findOne({ id: fileVideoId });

    videoFile.video = video;

    await videoFile.save();

    return video;
  }

  async updateVideo({ id, ...manageableData }: UpdateVideoDto) {
    const video = await Video.findOne({ id });

    console.log(manageableData);

    video.fromData(manageableData);

    await video.save();

    return video;
  }
}
