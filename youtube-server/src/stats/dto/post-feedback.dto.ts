import { IsNumber, IsEnum } from "class-validator";

import { Thumb } from "../stat.entity";

export class PostFeedbackDto {
  @IsNumber()
  videoId: number;

  @IsEnum(Thumb)
  thumb: Thumb;
}
