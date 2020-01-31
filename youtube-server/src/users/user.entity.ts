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

  // @todo: Prevent return within Channel, when "eager" turned on
  @Column()
  salt: string;

  // @todo: Prevent return within Channel, when "eager" turned on
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
    await this.hashPassword();

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
