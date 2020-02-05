import { Repository, EntityRepository } from "typeorm";
import { File } from "./file.entity";
import { FileDto } from "./dto/file.dto";
import { User } from "src/users/user.entity";
import { UserTokenDataDto } from "src/auth/dto/user-token.dto";

@EntityRepository(File)
export class FilesRepository extends Repository<File> {
  async saveFileData(fileDto: FileDto, userTokenData: UserTokenDataDto) {
    const file = new File();

    file.fromData({ ...fileDto, user: userTokenData.id });

    return file.save();
  }
}
