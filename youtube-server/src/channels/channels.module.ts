import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ChannelsController } from "./channels.controller";
import { ChannelsService } from "./channels.service";
import { ChannelsRepository } from "./channels.repository";

@Module({
  controllers: [ChannelsController],
  providers: [ChannelsService],
  imports: [TypeOrmModule.forFeature([ChannelsRepository])]
})
export class ChannelsModule {}
