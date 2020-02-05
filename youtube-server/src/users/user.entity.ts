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
import { classToPlain, Exclude } from "class-transformer";
import { Channel } from "src/channels/channel.entity";
import { File } from "src/files/file.entity";
import { Video } from "src/videos/video.entity";

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

@Entity()
@Unique(["email"])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  salt: string;

  @Column()
  @Exclude({ toPlainOnly: true })
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

  fromData = data => {
    Object.entries(data).forEach(([key, value]) => (this[key] = value));
  };

  validatePassword = async password => {
    const hashedPassword = await bcrypt.hash(password, this.salt);

    return hashedPassword === this.password;
  };

  hashPassword = async () => {
    this.salt = await bcrypt.genSalt();

    this.password = await bcrypt.hash(this.password, this.salt);
  };

  save = async ({
    customOptions,
    ...saveOptions
  }: SaveUserOptions = {}): Promise<this> => {
    const { isNew, passwordChanged } = customOptions || {};

    if (isNew || passwordChanged) {
      await this.hashPassword();
    }

    await super.save(saveOptions);

    delete this.password;
    delete this.salt;

    return this;
  };
}
