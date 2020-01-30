import { CreateUserDto } from "./dto/create-user.dto";
import { UserRepository } from "./users.repository";
import { User } from "./user.entity";
import { UpdateUserDto } from "./dto/update-user.dto";
export declare class UsersService {
    private userRepository;
    constructor(userRepository: UserRepository);
    createUser(createUserDto: CreateUserDto): Promise<User>;
    updateUser(updateUserDto: UpdateUserDto, user: User): Promise<User>;
    findOne(...data: any[]): Promise<User>;
}
