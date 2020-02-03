import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Entity,
  Unique,
  SaveOptions
} from "typeorm";
import { User } from "src/users/user.entity";

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
