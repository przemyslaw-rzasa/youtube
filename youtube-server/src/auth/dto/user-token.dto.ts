import { Role } from "src/users/user.entity";

export class UserTokenDataDto {
  id: number;
  email: string;
  role: Role;

  iat: number;
  exp: number;
}
