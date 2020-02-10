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
  BeforeRemove,
  OneToMany,
  BeforeInsert
} from "typeorm";

import { Channel } from "src/channels/channel.entity";
import { File, FileHost } from "src/files/file.entity";
import { User } from "src/users/user.entity";
import { PUBLIC_VIDEOS_PATH } from "src/constants";
import { YoutubeEntity, FromData } from "src/utils/decorators/YoutubeEntity";
import { Comment } from "src/comments/comment.entity";
import { Stat } from "src/stats/stat.entity";

@Entity()
@YoutubeEntity()
export class Video extends BaseEntity {
  fromData: FromData;

  thumbs: {
    up: Number;
    down: Number;
  };

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

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

  @OneToMany(
    type => Comment,
    comment => comment.video
  )
  comments: Comment[];

  @OneToMany(
    type => Stat,
    stat => stat.video
  )
  stats: Stat[];

  @BeforeRemove()
  async removeFile() {
    const { host, filename } = this.videoFile;

    await this.videoFile.remove();

    if (host === FileHost.LOCAL) {
      fs.unlink(join(PUBLIC_VIDEOS_PATH, filename), err => {
        console.log(err);
      });
    }
  }
}
