import { IsNumber } from "class-validator";

export class GetChannelDto {
  @IsNumber()
  id: number;
}
