import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Entity,
  Unique,
  SaveOptions,
  OneToMany
} from "typeorm";

import { User } from "src/users/user.entity";
import { Video } from "src/videos/video.entity";
import { YoutubeEntity, FromData } from "src/utils/decorators/YoutubeEntity";

@YoutubeEntity()
@Entity()
@Unique(["name"])
export class Channel extends BaseEntity {
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
    type => User,
    user => user.channels,
    {
      onDelete: "CASCADE"
    }
  )
  user: User;

  @OneToMany(
    type => Video,
    video => video.channel
  )
  videos: Video[];

  @Column()
  name: string;

  @Column()
  description: string;

  async save(saveOptions?: SaveOptions): Promise<this> {
    await super.save(saveOptions);

    return this;
  }
}
