import { MinLength, MaxLength, IsNumber, IsString } from "class-validator";

export class CreateVideoDto {
  @MinLength(2)
  @MaxLength(50)
  name: string;

  @MinLength(10)
  @MaxLength(1000)
  description: string;

  @IsNumber()
  channelId: number;

  @IsNumber()
  fileVideoId: number;
}
