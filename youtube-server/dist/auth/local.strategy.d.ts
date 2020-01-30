import { Strategy } from "passport-local";
import { AuthService } from "./auth.service";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { User } from "src/users/user.entity";
declare const LocalStrategy_base: new (...args: any[]) => Strategy;
export declare class LocalStrategy extends LocalStrategy_base {
    private authService;
    constructor(authService: AuthService);
    validate(authCredentialsDto: AuthCredentialsDto): Promise<User>;
}
export {};
