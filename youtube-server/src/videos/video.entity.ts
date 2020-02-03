import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne
} from "typeorm";
import { Channel } from "src/channels/channel.entity";

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

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  videoRef: string;

  fromData = data => {
    Object.entries(data).forEach(([key, value]) => (this[key] = value));
  };
}
