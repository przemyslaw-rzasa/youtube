import { MinLength, MaxLength, IsNumber, IsOptional } from "class-validator";

export class UpdateVideoDto {
  @MinLength(2)
  @MaxLength(30)
  @IsOptional()
  title: string;

  @MinLength(20)
  @MaxLength(1000)
  @IsOptional()
  description: string;

  @IsNumber()
  id: number;
}
