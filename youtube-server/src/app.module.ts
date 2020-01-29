import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { typeOrmConfig } from "./config/typeorm.config";
import { ChannelsModule } from './channels/channels.module';
import { VideosModule } from './videos/videos.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, TypeOrmModule.forRoot(typeOrmConfig), ChannelsModule, VideosModule, AuthModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
