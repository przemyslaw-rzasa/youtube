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

  @OneToOne(
    type => File,
    file => file,
    {
      onDelete: "CASCADE",
      onUpdate: "RESTRICT"
    }
  )
  @JoinColumn()
  videoFile: File;

  @Column()
  name: string;

  @Column()
  description: string;

  fromData = data => {
    Object.entries(data).forEach(([key, value]) => (this[key] = value));
  };
}
