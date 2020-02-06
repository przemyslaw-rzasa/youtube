import { Repository, EntityRepository } from "typeorm";

import { UserTokenDataDto } from "src/auth/dto/user-token.dto";

import { File } from "./file.entity";
import { FileDto } from "./dto/file.dto";

@EntityRepository(File)
export class FilesRepository extends Repository<File> {
  async saveFileData(
    fileDto: FileDto,
    userTokenDataDto: UserTokenDataDto
  ): Promise<File> {
    const file = new File({ ...fileDto, user: userTokenDataDto.id });

    return file.save();
  }
}
