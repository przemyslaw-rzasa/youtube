import { BaseEntity } from "typeorm";
export declare class User extends BaseEntity {
    id: number;
    email: string;
    salt: string;
    password: string;
    validatePassword: (password: any) => Promise<boolean>;
}
