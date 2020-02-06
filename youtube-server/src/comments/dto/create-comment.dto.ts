import { MinLength, MaxLength, IsNumber } from "class-validator";
import { MIN_COMMENT_LENGTH, MAX_COMMENT_LENGTH } from "../constants";

export class CreateCommentDto {
  @IsNumber()
  videoId: number;

  @MinLength(MIN_COMMENT_LENGTH)
  @MaxLength(MAX_COMMENT_LENGTH)
  content: string;
}
