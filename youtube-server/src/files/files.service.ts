import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { UserTokenDataDto } from "src/auth/dto/user-token.dto";

import { FileDto } from "./dto/file.dto";
import { FilesRepository } from "./files.repository";
import { File } from "./file.entity";

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(FilesRepository) private filesRepository: FilesRepository
  ) {}

  async saveFileData(
    fileDto: FileDto,
    userTokenDataDto: UserTokenDataDto
  ): Promise<File> {
    return await this.filesRepository.saveFileData(fileDto, userTokenDataDto);
  }
}
