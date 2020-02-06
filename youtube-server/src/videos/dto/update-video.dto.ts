import { MinLength, MaxLength, IsNumber, IsOptional } from "class-validator";
import {
  MIN_TITLE_LENGTH,
  MAX_TITLE_LENGTH,
  MIN_DESCRIPTION_LENGTH,
  MAX_DESCRIPTION_LENGTH
} from "../constants";

export class UpdateVideoDto {
  @MinLength(MIN_TITLE_LENGTH)
  @MaxLength(MAX_TITLE_LENGTH)
  @IsOptional()
  title: string;

  @MinLength(MIN_DESCRIPTION_LENGTH)
  @MaxLength(MAX_DESCRIPTION_LENGTH)
  @IsOptional()
  description: string;

  @IsNumber()
  id: number;
}
