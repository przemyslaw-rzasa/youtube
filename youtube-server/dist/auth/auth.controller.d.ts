import { AuthService } from "./auth.service";
import { User } from "src/users/user.entity";
export declare class AuthController {
  private authService;
  constructor(authService: AuthService);
  signIn(
    authCredentialsDto: User
  ): Promise<{
    access_token: string;
  }>;
}
