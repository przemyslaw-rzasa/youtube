import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

import { User } from "src/users/user.entity";
import { Channel } from "src/channels/channel.entity";
import { Video } from "src/videos/video.entity";
import { File } from "src/files/file.entity";
import { Comment } from "src/comments/comment.entity";
import { Stat } from "src/stats/stat.entity";

const entities = [User, Channel, Video, File, Comment, Stat];

export const typeOrmConfig: PostgresConnectionOptions = {
  type: "postgres",
  host: "youtube-database",
  username: "youtube",
  password: "youtube",
  database: "youtube",
  synchronize: true,
  entities
};
