import { MinLength } from "class-validator";

export class CreateChannelDto {
  @MinLength(2)
  name: string;

  @MinLength(20)
  description: string;
}
