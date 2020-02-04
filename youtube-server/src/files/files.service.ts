import { Injectable } from "@nestjs/common";
import { FileDto } from "./dto/file.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { FilesRepository } from "./files.repository";
import { User } from "src/users/user.entity";

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(FilesRepository) private filesRepository: FilesRepository
  ) {}

  async saveFileData(fileDto: FileDto, user: User) {
    return await this.filesRepository.saveFileData(fileDto, user);
  }

  async injectRelatedVideoId(videoId: number, fileId: number) {
    return await this.filesRepository.injectRelatedVideoId(videoId, fileId);
  }
}
