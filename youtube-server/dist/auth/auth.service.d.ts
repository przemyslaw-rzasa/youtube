import { UsersService } from "src/users/users.service";
import { User } from "src/users/user.entity";
import { JwtService } from "@nestjs/jwt";
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<User>;
    getToken({ id, email, role }: {
        id: any;
        email: any;
        role: any;
    }): Promise<{
        jwt_token: string;
    }>;
}
