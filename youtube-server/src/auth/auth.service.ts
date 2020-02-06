import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { UsersService } from "src/users/users.service";
import { User } from "src/users/user.entity";

export interface TokenPayload {
  jwt_token: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersService.findOne({ email });

    if (user && (await user.validatePassword(password))) {
      return user;
    }

    return null;
  }

  async getToken({ id, email, role }): Promise<TokenPayload> {
    const payload = { id, email, role };

    return { jwt_token: this.jwtService.sign(payload) };
  }
}
