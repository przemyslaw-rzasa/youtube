import { BaseEntity } from "typeorm";
export declare class User extends BaseEntity {
    id: number;
    email: string;
    salt: string;
    password: string;
    fromData: (data: any) => void;
    validatePassword: (password: any) => Promise<boolean>;
    create: () => Promise<void>;
}
