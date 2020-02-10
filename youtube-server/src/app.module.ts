import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ServeStaticModule } from "@nestjs/serve-static";
import { MulterModule } from "@nestjs/platform-express";

import { UsersModule } from "./users/users.module";
import { typeOrmConfig } from "./config/typeorm.config";
import { ChannelsModule } from "./channels/channels.module";
import { VideosModule } from "./videos/videos.module";
import { AuthModule } from "./auth/auth.module";
import { FilesModule } from "./files/files.module";
import { PUBLIC_PATH } from "./constants";
import { CommentsModule } from "./comments/comments.module";
import { StatsModule } from "./stats/stats.module";

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot(typeOrmConfig),
    ChannelsModule,
    VideosModule,
    AuthModule,
    ServeStaticModule.forRoot({
      rootPath: PUBLIC_PATH
    }),
    FilesModule,
    MulterModule.register({
      dest: PUBLIC_PATH
    }),
    CommentsModule,
    StatsModule
  ]
})
export class AppModule {}
