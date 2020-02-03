import { Repository, EntityRepository } from "typeorm";
import { Video } from "./video.entity";
import { CreateVideoDto } from "./dto/create-video.dto";

@EntityRepository(Video)
export class VideoRepository extends Repository<Video> {
  async createVideo(createVideoDto: CreateVideoDto) {
    const video = new Video();

    console.log(this.create);
  }
}
