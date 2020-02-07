import { BaseEntity, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { YoutubeEntity, FromData } from "src/utils/decorators/YoutubeEntity";
import { User } from "src/users/user.entity";
import { Video } from "src/videos/video.entity";

@YoutubeEntity()
@Entity()
export class Comment extends BaseEntity {
  constructor(data?) {
    super();

    if (data) {
      this.fromData(data);
    }
  }

  fromData: FromData;

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    type => User,
    user => user.comments
  )
  user: User;

  @ManyToOne(
    type => Video,
    video => video.comments
  )
  video: Video;
}
