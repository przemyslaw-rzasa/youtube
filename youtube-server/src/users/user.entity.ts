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

  @Column()
  salt: string;

  @Column()
  password: string;

  validatePassword = async password => {
    const hashedPassword = await bcrypt.hash(password, this.salt);

    return hashedPassword === password;
  };
}
