import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";
import { AuthUserDto } from "./dto/auth-user.dto";
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    signUp(createUserDto: CreateUserDto): Promise<import("./user.entity").User>;
    singIn(authUserDto: AuthUserDto): Promise<import("./user.entity").User>;
}
