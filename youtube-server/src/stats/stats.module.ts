import { Module } from "@nestjs/common";
import { StatsController } from "./stats.controller";
import { StatsService } from "./stats.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StatsRepository } from "./stats.repository";

@Module({
  controllers: [StatsController],
  providers: [StatsService],
  imports: [TypeOrmModule.forFeature([StatsRepository])]
})
export class StatsModule {}
