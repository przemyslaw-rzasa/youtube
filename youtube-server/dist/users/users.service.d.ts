import { CreateUserDto } from "./dto/create-user.dto";
import { UserRepository } from "./users.repository";
import { AuthUserDto } from "./dto/auth-user.dto";
export declare class UsersService {
    private userRepository;
    constructor(userRepository: UserRepository);
    createUser(createUserDto: CreateUserDto): Promise<import("./user.entity").User>;
    singIn(authUserDto: AuthUserDto): Promise<import("./user.entity").User>;
}
