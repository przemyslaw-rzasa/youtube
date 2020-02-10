import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
  Column,
  ManyToOne
} from "typeorm";

import { Video } from "src/videos/video.entity";
import { User } from "src/users/user.entity";
import { YoutubeEntity, FromData } from "src/utils/decorators/YoutubeEntity";

export enum Thumb {
  UP = "up",
  DOWN = "down"
}

@YoutubeEntity()
@Entity()
export class Stat extends BaseEntity {
  fromData: FromData;

  constructor(data?) {
    super();

    if (data) {
      this.fromData(data);
    }
  }

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    type => Video,
    video => video.stats,
    {
      onDelete: "CASCADE"
    }
  )
  video: Video;

  @ManyToOne(
    type => User,
    user => user.id,
    {
      onDelete: "CASCADE"
    }
  )
  user: User;

  @Column()
  thumb: Thumb;
}
