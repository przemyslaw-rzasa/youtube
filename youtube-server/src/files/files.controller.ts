import { join } from "path";
import { diskStorage } from "multer";
import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  UseGuards,
  BadRequestException
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { AuthGuard } from "@nestjs/passport";

import { GetUser } from "src/auth/get-user.decorator";
import { UserTokenDataDto } from "src/auth/dto/user-token.dto";
import { PUBLIC_IMAGES_PATH, PUBLIC_VIDEOS_PATH } from "src/constants";

import { FilesService } from "./files.service";
import { FileType, FileHost, File } from "./file.entity";
import { editFileName } from "./helpers/editFileName";
import { imageFileFilter } from "./helpers/imageFileFilter";
import { videoFileFilter } from "./helpers/videoFileFilter";
import { SaveFileDataDto } from "./dto/save-file-data.dto";

@Controller("files")
export class FilesController {
  constructor(private filesService: FilesService) {}

  @Post("/image")
  @UseGuards(AuthGuard("jwt"))
  @UseInterceptors(
    FileInterceptor("data", {
      fileFilter: imageFileFilter,
      storage: diskStorage({
        destination: PUBLIC_IMAGES_PATH,
        filename: editFileName
      })
    })
  )
  async uploadImage(
    @UploadedFile() file,
    @GetUser() userTokenDataDto: UserTokenDataDto
  ): Promise<File> {
    if (!file) {
      throw new BadRequestException("File not provided");
    }

    const { originalname, filename, size } = file;

    const fileDto: SaveFileDataDto = {
      originalname,
      filename,
      size,
      type: FileType.IMAGE,
      host: FileHost.LOCAL
    };

    const fileData = await this.filesService.saveFileData(
      fileDto,
      userTokenDataDto
    );

    return fileData;
  }

  // @todo: What if, video creation will fail?
  @Post("/video")
  @UseGuards(AuthGuard("jwt"))
  @UseInterceptors(
    FileInterceptor("data", {
      fileFilter: videoFileFilter,
      storage: diskStorage({
        destination: PUBLIC_VIDEOS_PATH,
        filename: editFileName
      })
    })
  )
  async uploadVideo(
    @UploadedFile() file,
    @GetUser() userTokenDataDto: UserTokenDataDto
  ): Promise<File> {
    if (!file) {
      throw new BadRequestException("File not provided");
    }

    const { originalname, filename, size } = file;

    const fileDto: SaveFileDataDto = {
      originalname,
      filename,
      size,
      type: FileType.VIDEO,
      host: FileHost.LOCAL
    };

    const fileData = await this.filesService.saveFileData(
      fileDto,
      userTokenDataDto
    );

    return fileData;
  }
}
