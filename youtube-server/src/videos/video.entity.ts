import * as fs from "fs";
import { join } from "path";
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
  BeforeRemove
} from "typeorm";

import { Channel } from "src/channels/channel.entity";
import { File, FileHost } from "src/files/file.entity";
import { User } from "src/users/user.entity";
import { PUBLIC_VIDEOS_PATH } from "src/constants";
import { YoutubeEntity, FromData } from "src/utils/decorators/YoutubeEntity";

@Entity()
@YoutubeEntity()
export class Video extends BaseEntity {
  fromData: FromData;

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    type => Channel,
    channel => channel.videos,
    {
      onDelete: "CASCADE"
    }
  )
  channel: Channel;

  @ManyToOne(
    type => User,
    user => user.videos,
    {
      onDelete: "CASCADE"
    }
  )
  user: User;

  @OneToOne(
    type => File,
    file => file.video,
    {
      onDelete: "CASCADE"
    }
  )
  @JoinColumn()
  videoFile: File;

  @Column()
  title: string;

  @Column()
  description: string;

  @BeforeRemove()
  removeStaticVideoFile() {
    const { host, filename } = this.videoFile;

    if (host === FileHost.LOCAL) {
      fs.unlink(join(PUBLIC_VIDEOS_PATH, filename), err => {
        console.log(err);
      });
    }
  }
}
