import { CreateUserDto } from "./dto/create-user.dto";
import { UserRepository } from "./users.repository";
export declare class UsersService {
    private userRepository;
    constructor(userRepository: UserRepository);
    createUser(createUserDto: CreateUserDto): Promise<import("./user.entity").User>;
    updateUser(updateUserDto: CreateUserDto): Promise<void>;
    findOne(...data: any[]): Promise<import("./user.entity").User>;
}
