import * as bcrypt from "bcryptjs";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  Unique,
  OneToMany,
  SaveOptions
} from "typeorm";

import { Channel } from "src/channels/channel.entity";
import { File } from "src/files/file.entity";
import { Video } from "src/videos/video.entity";
import { YoutubeEntity, FromData } from "src/utils/decorators/YoutubeEntity";
import { Comment } from "src/comments/comment.entity";

export enum Role {
  ADMIN = "admin",
  USER = "user"
}

interface AdditionalSaveOptions {
  customOptions?: {
    passwordChanged?: boolean;
    isNew?: boolean;
  };
}

type SaveUserOptions = SaveOptions & AdditionalSaveOptions;

@YoutubeEntity()
@Entity()
@Unique(["email"])
export class User extends BaseEntity {
  // @todo: Possibility, to have it declared out of box?
  fromData: FromData;

  constructor(data?) {
    super();

    if (data) {
      this.fromData(data);
    }
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  salt: string;

  @Column()
  password: string;

  @Column({
    type: "enum",
    enum: Role,
    default: Role.USER
  })
  role: Role;

  @OneToMany(
    type => Channel,
    channel => channel.user
  )
  channels: Channel[];

  @OneToMany(
    type => Video,
    video => video.user
  )
  videos: Video[];

  @OneToMany(
    type => File,
    file => file.user
  )
  files: File[];

  @OneToMany(
    type => Comment,
    comment => comment.user
  )
  comments: Comment[];

  validatePassword = async (password): Promise<boolean> => {
    const hashedPassword = await bcrypt.hash(password, this.salt);

    return hashedPassword === this.password;
  };

  hashPassword = async (): Promise<void> => {
    this.salt = await bcrypt.genSalt();

    this.password = await bcrypt.hash(this.password, this.salt);
  };

  save = async ({
    customOptions = {},
    ...saveOptions
  }: SaveUserOptions = {}): Promise<this> => {
    const { isNew, passwordChanged } = customOptions;

    if (isNew || passwordChanged) {
      await this.hashPassword();
    }

    await super.save(saveOptions);

    return this;
  };
}
