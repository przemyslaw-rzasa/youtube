import { BaseEntity } from "typeorm";
import { User } from "src/users/user.entity";
export declare class Channel extends BaseEntity {
    id: number;
    user: User;
    name: string;
    description: string;
}
