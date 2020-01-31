import { MinLength, IsNumber } from "class-validator";

export class UpdateChannelDto {
  @IsNumber()
  id: number;

  @MinLength(2)
  name: string;

  @MinLength(20)
  description: string;
}
