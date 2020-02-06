import { UserTokenDataDto } from "src/auth/dto/user-token.dto";
import { Role } from "src/users/user.entity";

export const isAdmin = ({ role }: UserTokenDataDto) => role === Role.ADMIN;
