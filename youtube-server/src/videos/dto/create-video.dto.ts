import { MinLength, MaxLength, IsNumber, IsString } from "class-validator";

export class CreateVideoDto {
  @MinLength(2)
  @MaxLength(30)
  name: string;

  @MinLength(20)
  @MaxLength(1000)
  description: string;

  @IsNumber()
  channelId: number;

  @IsString()
  videoFileName: string;
}
