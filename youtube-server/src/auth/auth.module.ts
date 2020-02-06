import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";

import { UsersModule } from "src/users/users.module";

import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt.strategy";
import { AuthController } from "./auth.controller";
import { LocalStrategy } from "./local.strategy";
import { EXPIRES_IN } from "./constants";

@Module({
  providers: [AuthService, JwtStrategy, LocalStrategy],
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: EXPIRES_IN
      }
    })
  ],
  exports: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
