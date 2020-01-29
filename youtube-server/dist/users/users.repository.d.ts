import { Repository } from "typeorm";
import { User } from "./user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
export declare class UserRepository extends Repository<User> {
    createUser(createUserDto: CreateUserDto): Promise<User>;
    updateUser(updateUserDto: CreateUserDto): Promise<void>;
}
