import { Repository } from "typeorm";
import { User } from "./user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
export declare class UserRepository extends Repository<User> {
    createUser(createUserDto: CreateUserDto): Promise<User>;
    updateUser(userData: UpdateUserDto): Promise<User>;
    deleteUser(id: number): Promise<void>;
}
