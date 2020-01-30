import { Strategy, ExtractJwt } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SECRET } from "./constants";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: SECRET
    });
  }

  async validate(data): Promise<any> {
    console.log("JWT VALIDATE");
    return data;
  }
}
