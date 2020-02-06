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
import { publicPath } from "src/app.module";

@Entity()
export class Video extends BaseEntity {
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

  fromData = data => {
    Object.entries(data).forEach(([key, value]) => (this[key] = value));
  };

  @BeforeRemove()
  removeStaticVideoFile() {
    const { host, filename } = this.videoFile;

    if (host === FileHost.LOCAL) {
      fs.unlink(join(publicPath, "videos", filename), err => {
        console.log(err);
      });
    }
  }
}
