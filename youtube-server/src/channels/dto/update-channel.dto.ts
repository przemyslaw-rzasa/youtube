import { MinLength, IsNumber, IsOptional } from "class-validator";

import {
  MIN_CHANNEL_NAME_LENGTH,
  MIN_CHANNEL_DESCRIPTION_LENGTH
} from "../constants";

export class UpdateChannelDto {
  @IsNumber()
  id: number;

  @IsOptional()
  @MinLength(MIN_CHANNEL_NAME_LENGTH)
  name: string;

  @IsOptional()
  @MinLength(MIN_CHANNEL_DESCRIPTION_LENGTH)
  description: string;
}
