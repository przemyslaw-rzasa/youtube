import { Controller, Post, Body, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { User } from "src/users/user.entity";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  // @UseGuards(AuthGuard("jwt"))
  @Post("/sign-in")
  async signIn(@Body() authCredentialsDto: User) {
    console.log("/sign-in passed");
    return this.authService.signIn(authCredentialsDto);
  }
}
