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
    channel => channel
  )
  channel: Channel;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  href: string;
}
