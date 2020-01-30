import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "./auth.service";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { User } from "src/users/user.entity";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();

    console.log("Local Strategy construct");
  }

  async validate(authCredentialsDto: AuthCredentialsDto): Promise<User> {
    console.log("LOCAL VALIDATE");
    const user = await this.authService.validateUser(authCredentialsDto);

    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }

    return user;
  }
}
