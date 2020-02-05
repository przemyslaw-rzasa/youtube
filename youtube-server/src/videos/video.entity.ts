import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn
} from "typeorm";
import { Channel } from "src/channels/channel.entity";
import { File } from "src/files/file.entity";
import { User } from "src/users/user.entity";

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
}
