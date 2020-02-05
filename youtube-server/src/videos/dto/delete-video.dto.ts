import { IsNumber } from "class-validator";

export class DeleteVideoDto {
  @IsNumber()
  id: number;
}
