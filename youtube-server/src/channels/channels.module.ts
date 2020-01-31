import { Module } from "@nestjs/common";
import { ChannelsController } from "./channels.controller";
import { ChannelsService } from "./channels.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ChannelsRepository } from "./channels.repository";

@Module({
  controllers: [ChannelsController],
  providers: [ChannelsService],
  imports: [TypeOrmModule.forFeature([ChannelsRepository])]
})
export class ChannelsModule {}
