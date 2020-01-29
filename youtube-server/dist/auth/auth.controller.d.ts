import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { AuthService } from "./auth.service";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    singIn(authCredentialsDto: AuthCredentialsDto): Promise<{
        access_token: string;
    }>;
}
