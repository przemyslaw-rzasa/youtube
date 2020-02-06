import { Module } from "@nestjs/common";
import { CommentsController } from "./comments.controller";
import { CommentsService } from "./comments.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommentsRepository } from "./comments.repository";

@Module({
  controllers: [CommentsController],
  providers: [CommentsService],
  imports: [TypeOrmModule.forFeature([CommentsRepository])]
})
export class CommentsModule {}
