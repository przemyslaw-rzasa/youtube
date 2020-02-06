import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { FilesController } from "./files.controller";
import { FilesService } from "./files.service";
import { FilesRepository } from "./files.repository";

@Module({
  controllers: [FilesController],
  providers: [FilesService],
  imports: [TypeOrmModule.forFeature([FilesRepository])]
})
export class FilesModule {}
