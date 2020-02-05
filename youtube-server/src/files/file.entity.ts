import {
  Column,
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  SaveOptions,
  ManyToOne,
  OneToOne,
  JoinColumn
} from "typeorm";
import { User } from "src/users/user.entity";
import { Video } from "src/videos/video.entity";

export enum FileType {
  VIDEO = "video",
  IMAGE = "image"
}

export enum FileHost {
  LOCAL = "local",
  S3 = "s3"
}

@Entity()
export class File extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "enum",
    enum: FileType,
    default: FileType.VIDEO
  })
  type: FileType;

  @Column()
  filename: string;

  @Column()
  originalname: string;

  @Column()
  size: number;

  @Column({
    type: "enum",
    enum: FileHost,
    default: FileHost.LOCAL
  })
  host: FileHost;

  @ManyToOne(
    type => User,
    user => user.files
  )
  user: User;

  @OneToOne(
    type => Video,
    video => video.videoFile,
    {
      onDelete: "CASCADE"
    }
  )
  @JoinColumn()
  video: Video;

  fromData = data => {
    Object.entries(data).forEach(([key, value]) => (this[key] = value));
  };

  async save(saveOptions?: SaveOptions): Promise<this> {
    await super.save(saveOptions);

    return this;
  }
}
