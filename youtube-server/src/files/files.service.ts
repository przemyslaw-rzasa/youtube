import { Injectable } from "@nestjs/common";
import { FileDto } from "./dto/file.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { FilesRepository } from "./files.repository";
import { UserTokenDataDto } from "src/auth/dto/user-token.dto";

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(FilesRepository) private filesRepository: FilesRepository
  ) {}

  async saveFileData(fileDto: FileDto, userTokenData: UserTokenDataDto) {
    return await this.filesRepository.saveFileData(fileDto, userTokenData);
  }
}
