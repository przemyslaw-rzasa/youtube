import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Entity,
  Unique,
  JoinColumn
} from "typeorm";
import { User } from "src/users/user.entity";

@Entity()
@Unique(["name"])
export class Channel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @JoinColumn()
  @ManyToOne(
    type => User,
    user => user.channels,
    {
      eager: true,
      onDelete: "CASCADE"
    }
  )
  user: User;

  @Column()
  name: string;

  @Column()
  description: string;

  fromData = data => {
    Object.entries(data).forEach(([key, value]) => (this[key] = value));
  };

  // @todo: ??
  create = () => this.save();

  update = () => this.save();
}
