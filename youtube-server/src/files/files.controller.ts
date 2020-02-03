import { join } from "path";
import { diskStorage } from "multer";
import * as uuid from "uuid";

import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";

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
  @Post("/image")
  @UseInterceptors(
    FileInterceptor("data", {
      fileFilter: imageFileFilter,
      storage: diskStorage({
        destination: join(process.cwd(), "public", "images"),
        filename: editFileName
      })
    })
  )
  uploadImage(@UploadedFile() file) {
    return {
      originalname: file.originalname,
      filename: file.filename
    };
  }

  @Post("/video")
  @UseInterceptors(
    FileInterceptor("data", {
      fileFilter: videoFileFilter,
      storage: diskStorage({
        destination: join(process.cwd(), "public", "videos"),
        filename: editFileName
      })
    })
  )
  uploadVideo(@UploadedFile() file) {
    return {
      originalname: file.originalname,
      filename: file.filename
    };
  }
}
