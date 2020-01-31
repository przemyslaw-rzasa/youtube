import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";
import { User } from "./user.entity";
import { UpdateUserDto } from "./dto/update-user.dto";
import { DeleteUserDto } from "./dto/delete-user.dto";
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    getUser(user: User): User;
    createUser(createUserDto: CreateUserDto): Promise<User>;
    updateUser(updateUserDto: UpdateUserDto, user: any): Promise<User>;
    deleteUser(deleteUserDto: DeleteUserDto, user: any): Promise<void>;
}
