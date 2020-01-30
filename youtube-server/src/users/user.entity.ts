import * as bcrypt from "bcryptjs";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  Unique
} from "typeorm";

@Entity()
@Unique(["email"])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  // @todo: read about salt storage
  @Column()
  salt: string;

  @Column()
  password: string;

  fromData = data => {
    Object.entries(data).forEach(([key, value]) => (this[key] = value));
  };

  validatePassword = async password => {
    const hashedPassword = await bcrypt.hash(password, this.salt);

    return hashedPassword === this.password;
  };

  create = async () => {
    this.salt = await bcrypt.genSalt();

    this.password = await bcrypt.hash(this.password, this.salt);

    await this.save();

    delete this.password;
    delete this.salt;
  };
}
