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

@Entity()
@Unique(["name"])
export class Channel extends BaseEntity {
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

  userId: string;

  @OneToMany(
    type => Video,
    video => video.channel
  )
  videos: Video[];

  @Column()
  name: string;

  @Column()
  description: string;

  fromData = data => {
    Object.entries(data).forEach(([key, value]) => (this[key] = value));
  };

  async save(saveOptions?: SaveOptions): Promise<this> {
    await super.save(saveOptions);

    delete this.user;
    delete this.userId;

    return this;
  }
}
