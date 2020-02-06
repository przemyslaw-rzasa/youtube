import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";

import { User } from "src/users/user.entity";
import { LOGIN_KEY, PASSWORD_KEY } from "src/users/constants";

import { AuthService } from "./auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: LOGIN_KEY,
      passwordField: PASSWORD_KEY
    });
  }

  async validate(email: string, password: string): Promise<User> {
    const user = await this.authService.validateUser(email, password);

    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }

    return user;
  }
}
