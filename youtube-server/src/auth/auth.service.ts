import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { User } from "src/users/user.entity";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(authUserDto: AuthCredentialsDto): Promise<User> {
    const { email, password } = authUserDto;

    const user = await this.usersService.findOne({ email });

    if (user && (await user.validatePassword(password))) {
      return user;
    }

    return null;
  }

  async signIn(authCredentialsDto: AuthCredentialsDto) {
    const user = await this.validateUser(authCredentialsDto);

    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const payload = { email: user.email, id: user.id };

    return {
      access_token: this.jwtService.sign(payload)
    };
  }
}
