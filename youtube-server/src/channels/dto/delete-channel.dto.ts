import { IsNumber } from "class-validator";

export class DeleteChannelDto {
  @IsNumber()
  id: number;
}
