import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

export const typeOrmConfig: PostgresConnectionOptions = {
  type: "postgres",
  host: "youtube-database",
  username: "postgres",
  password: "test",
  database: "postgres",
  entities: [],
  synchronize: true
};
