import { createParamDecorator } from "@nestjs/common";

import { UserTokenDataDto } from "./dto/user-token.dto";

export const GetUser = createParamDecorator(
  (data, req): UserTokenDataDto => req.user
);
