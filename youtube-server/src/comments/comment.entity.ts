import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  AfterInsert,
  Column
} from "typeorm";
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

  @Column()
  content: string;

  @ManyToOne(
    type => User,
    user => user.comments,
    {
      onDelete: "CASCADE"
    }
  )
  user: User;

  @ManyToOne(
    type => Video,
    video => video.comments,
    {
      onDelete: "CASCADE"
    }
  )
  video: Video;
}
