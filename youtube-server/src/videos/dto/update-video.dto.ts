import { MinLength, MaxLength } from "class-validator";

export class UpdateVideoDto {
  @MinLength(2)
  @MaxLength(30)
  name: string;

  @MinLength(20)
  @MaxLength(1000)
  description: string;

  videoId: string;
}
