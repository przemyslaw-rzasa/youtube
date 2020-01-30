import { BaseEntity } from "typeorm";
import { Channel } from "src/channels/channel.entity";
export declare enum Role {
    ADMIN = "admin",
    USER = "user"
}
export declare class User extends BaseEntity {
    id: number;
    email: string;
    salt: string;
    password: string;
    role: Role;
    channels: Channel[];
    fromData: (data: any) => void;
    validatePassword: (password: any) => Promise<boolean>;
    hashPassword: () => Promise<void>;
    create: () => Promise<void>;
    update: ({ passwordChanged }: {
        passwordChanged: any;
    }) => Promise<void>;
}
