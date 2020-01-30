import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./jwt.strategy";
import { JWT_SECRET } from "./constants";
import { AuthController } from "./auth.controller";
import { UsersModule } from "src/users/users.module";
import { LocalStrategy } from "./local.strategy";

@Module({
  providers: [AuthService, JwtStrategy, LocalStrategy],
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: "local" }),
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: {
        expiresIn: "100000000s"
      }
    })
  ],
  exports: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
