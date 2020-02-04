import { FileHost, FileType } from "../file.entity";

export class FileDto {
  originalname: string;
  filename: string;
  size: number;
  host: FileHost;
  type: FileType;
}
