import { Repository } from "typeorm";
import { User } from "./user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { AuthUserDto } from "./dto/auth-user.dto";
export declare class UserRepository extends Repository<User> {
    validateUser(authUserDto: AuthUserDto): Promise<User>;
    createUser(createUserDto: CreateUserDto): Promise<User>;
}
