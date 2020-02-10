import { IsNumber } from "class-validator";

export class RemoveFileDataDto {
  @IsNumber()
  id: number;
}
