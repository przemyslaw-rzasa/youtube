import { Controller, Post, UseGuards, Req } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

import { AuthService, TokenPayload } from "./auth.service";
import { GetUser } from "./get-user.decorator";
import { User } from "src/users/user.entity";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard("local"))
  @Post("/sign-in")
  signIn(@GetUser() user: User): Promise<TokenPayload> {
    return this.authService.getToken(user);
  }
}
