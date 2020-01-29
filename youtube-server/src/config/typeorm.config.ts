import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import { User } from "src/users/user.entity";

export const typeOrmConfig: PostgresConnectionOptions = {
  type: "postgres",
  host: "youtube-database",
  username: "youtube",
  password: "youtube",
  database: "youtube",
  entities: [User],
  synchronize: true
};
