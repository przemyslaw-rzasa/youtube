import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    createUser(createUserDto: CreateUserDto): Promise<import("./user.entity").User>;
    updateUser(updateUserDto: CreateUserDto): Promise<void>;
    deleteUser(createUserDto: CreateUserDto): Promise<import("./user.entity").User>;
    testAuth(): Promise<string>;
}
