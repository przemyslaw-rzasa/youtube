import { Repository, EntityRepository } from "typeorm";
import { File } from "./file.entity";
import { FileDto } from "./dto/file.dto";
import { User } from "src/users/user.entity";

@EntityRepository(File)
export class FilesRepository extends Repository<File> {
  async saveFileData(fileDto: FileDto, user: User) {
    const file = new File();

    file.fromData({ ...fileDto, user: user.id });

    return file.save();
  }

  async injectRelatedVideoId(videoId: number, fileId: number) {
    const file = File.findOne({ id: fileId });
  }
}
