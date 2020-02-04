import { Module } from "@nestjs/common";
import { FilesController } from "./files.controller";
import { FilesService } from "./files.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FilesRepository } from "./files.repository";

@Module({
  controllers: [FilesController],
  providers: [FilesService],
  imports: [TypeOrmModule.forFeature([FilesRepository])]
})
export class FilesModule {}
