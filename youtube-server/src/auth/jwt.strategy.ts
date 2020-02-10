import { Strategy, ExtractJwt } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, NotFoundException } from "@nestjs/common";
import { User } from "src/users/user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: process.env.JWT_SECRET
    });
  }

  async validate(data): Promise<any> {
    if (process.env.NODE_ENV === "development") {
      const user = await User.findOne({ id: data.id });

      if (!user) {
        throw new NotFoundException("User does not exists");
      }
    }

    return data;
  }
}
