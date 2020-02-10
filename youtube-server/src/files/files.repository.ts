import { Repository, EntityRepository } from "typeorm";

import { UserTokenDataDto } from "src/auth/dto/user-token.dto";

import { File } from "./file.entity";
import { SaveFileDataDto } from "./dto/save-file-data.dto";
import { RemoveFileDataDto } from "./dto/remove-file-data.dto";

@EntityRepository(File)
export class FilesRepository extends Repository<File> {
  async saveFileData(
    fileDto: SaveFileDataDto,
    userTokenDataDto: UserTokenDataDto
  ): Promise<File> {
    const file = new File({ ...fileDto, user: userTokenDataDto.id });

    return file.save();
  }

  // async removeFileData({ id }: RemoveFileDataDto) {
  //   const file = await File.findOne({ id });

  //   return await file.remove();
  // }
}
