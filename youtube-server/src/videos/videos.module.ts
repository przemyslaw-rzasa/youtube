import { Module } from "@nestjs/common";
import { VideosController } from "./videos.controller";
import { VideosService } from "./videos.service";
import { VideoRepository } from "./video.repository";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  controllers: [VideosController],
  providers: [VideosService],
  imports: [TypeOrmModule.forFeature([VideoRepository])]
})
export class VideosModule {}
