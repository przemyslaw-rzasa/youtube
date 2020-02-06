import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { VideosController } from "./videos.controller";
import { VideosService } from "./videos.service";
import { VideoRepository } from "./video.repository";

@Module({
  controllers: [VideosController],
  providers: [VideosService],
  imports: [TypeOrmModule.forFeature([VideoRepository])]
})
export class VideosModule {}
