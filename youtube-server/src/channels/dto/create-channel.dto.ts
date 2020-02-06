import { MinLength } from "class-validator";

import {
  MIN_CHANNEL_NAME_LENGTH,
  MIN_CHANNEL_DESCRIPTION_LENGTH
} from "../constants";

export class CreateChannelDto {
  @MinLength(MIN_CHANNEL_NAME_LENGTH)
  name: string;

  @MinLength(MIN_CHANNEL_DESCRIPTION_LENGTH)
  description: string;
}
