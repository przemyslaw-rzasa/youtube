import { join } from "path";
import { diskStorage } from "multer";
import * as uuid from "uuid";

import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  UseGuards,
  BadRequestException
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { FilesService } from "./files.service";
import { PUBLIC_PATH } from "src/constants";
import { FileDto } from "./dto/file.dto";
import { FileType, FileHost } from "./file.entity";
import { AuthGuard } from "@nestjs/passport";
import { GetUser } from "src/auth/get-user.decorator";
import { User } from "src/users/user.entity";

const editFileName = (req, file, callback) => {
  const arrayOriginalName = file.originalname.split(".");
  const ext = arrayOriginalName.pop();
  const unique = uuid().replace(/-/g, "");

  const filename = `${arrayOriginalName.join("_")}_${unique}.${ext}`;

  callback(null, filename);
};

const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new Error("Only image files are allowed!"), false);
  }
  callback(null, true);
};

const videoFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(mp4|avi)$/)) {
    return callback(new Error("Only image files are allowed!"), false);
  }
  callback(null, true);
};

@Controller("files")
export class FilesController {
  constructor(private filesService: FilesService) {}

  @Post("/image")
  @UseGuards(AuthGuard("jwt"))
  @UseInterceptors(
    FileInterceptor("data", {
      fileFilter: imageFileFilter,
      storage: diskStorage({
        destination: join(PUBLIC_PATH, "images"),
        filename: editFileName
      })
    })
  )
  async uploadImage(@UploadedFile() file, @GetUser() user: User) {
    if (!file) {
      throw new BadRequestException("File not provided");
    }

    const { originalname, filename, size } = file;

    const fileDto: FileDto = {
      originalname,
      filename,
      size,
      type: FileType.IMAGE,
      host: FileHost.LOCAL
    };

    const fileData = await this.filesService.saveFileData(fileDto, user);

    return fileData;
  }

  @Post("/video")
  @UseGuards(AuthGuard("jwt"))
  @UseInterceptors(
    FileInterceptor("data", {
      fileFilter: videoFileFilter,
      storage: diskStorage({
        destination: join(PUBLIC_PATH, "videos"),
        filename: editFileName
      })
    })
  )
  async uploadVideo(@UploadedFile() file, @GetUser() user: User) {
    if (!file) {
      throw new BadRequestException("File not provided");
    }

    const { originalname, filename, size } = file;

    const fileDto: FileDto = {
      originalname,
      filename,
      size,
      type: FileType.VIDEO,
      host: FileHost.LOCAL
    };

    const fileData = await this.filesService.saveFileData(fileDto, user);

    return fileData;
  }
}
