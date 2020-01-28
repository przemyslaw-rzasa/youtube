import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

export const typeOrmConfig: PostgresConnectionOptions = {
  type: "postgres",
  host: "youtube-database",
  username: "youtube",
  password: "youtube",
  database: "youtube",
  entities: [],
  synchronize: true
};
