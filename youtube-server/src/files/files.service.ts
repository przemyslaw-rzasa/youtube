import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { UserTokenDataDto } from "src/auth/dto/user-token.dto";

import { FilesRepository } from "./files.repository";
import { File } from "./file.entity";
import { RemoveFileDataDto } from "./dto/remove-file-data.dto";
import { SaveFileDataDto } from "./dto/save-file-data.dto";

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(FilesRepository) private filesRepository: FilesRepository
  ) {}

  async saveFileData(
    fileDto: SaveFileDataDto,
    userTokenDataDto: UserTokenDataDto
  ): Promise<File> {
    return await this.filesRepository.saveFileData(fileDto, userTokenDataDto);
  }

  // async removeFileData(removeFileDataDto: RemoveFileDataDto) {
  //   return await this.filesRepository.removeFileData(removeFileDataDto);
  // }
}
