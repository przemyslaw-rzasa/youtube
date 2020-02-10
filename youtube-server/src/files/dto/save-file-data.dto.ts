import { FileHost, FileType } from "../file.entity";

export class SaveFileDataDto {
  originalname: string;
  filename: string;
  size: number;
  host: FileHost;
  type: FileType;
}
