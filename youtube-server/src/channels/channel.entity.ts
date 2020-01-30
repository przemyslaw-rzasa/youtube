import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Entity
} from "typeorm";
import { User } from "src/users/user.entity";

@Entity()
export class Channel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    type => User,
    user => user
  )
  user: User;

  @Column()
  name: string;

  @Column()
  description: string;
}
