import { MinLength, MaxLength, IsNumber, IsString } from "class-validator";
import {
  MIN_TITLE_LENGTH,
  MAX_TITLE_LENGTH,
  MIN_DESCRIPTION_LENGTH,
  MAX_DESCRIPTION_LENGTH
} from "../constants";

export class CreateVideoDto {
  @MinLength(MIN_TITLE_LENGTH)
  @MaxLength(MAX_TITLE_LENGTH)
  title: string;

  @MinLength(MIN_DESCRIPTION_LENGTH)
  @MaxLength(MAX_DESCRIPTION_LENGTH)
  description: string;

  @IsNumber()
  channelId: number;

  @IsNumber()
  fileVideoId: number;
}
