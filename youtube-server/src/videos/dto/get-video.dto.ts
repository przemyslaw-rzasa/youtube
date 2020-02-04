import { IsNumber } from "class-validator";

export class GetVideoDto {
  @IsNumber()
  id: number;
}
