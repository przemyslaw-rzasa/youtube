import * as bcrypt from "bcryptjs";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  Unique,
  OneToMany
} from "typeorm";
import { Channel } from "src/channels/channel.entity";

export enum Role {
  ADMIN = "admin",
  USER = "user"
}

@Entity()
@Unique(["email"])
export class User extends BaseEntity {
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
    enum: Role
  })
  role: Role = Role.USER;

  @OneToMany(
    type => Channel,
    channel => channel
  )
  channels: Channel[];

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

  create = async () => {
    this.hashPassword();

    await this.save();

    delete this.password;
    delete this.salt;
  };

  update = async ({ passwordChanged }) => {
    if (passwordChanged) {
      this.hashPassword();
    }

    await this.save();

    delete this.password;
    delete this.salt;
  };
}
