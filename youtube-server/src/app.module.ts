import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { typeOrmConfig } from "./config/typeorm.config";
import { ChannelsModule } from "./channels/channels.module";
import { VideosModule } from "./videos/videos.module";
import { AuthModule } from "./auth/auth.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { FilesModule } from "./files/files.module";
import { MulterModule } from "@nestjs/platform-express";

export const publicPath = join(process.cwd(), "public");

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot(typeOrmConfig),
    ChannelsModule,
    VideosModule,
    AuthModule,
    ServeStaticModule.forRoot({
      rootPath: publicPath
    }),
    FilesModule,
    MulterModule.register({
      dest: publicPath
    })
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
