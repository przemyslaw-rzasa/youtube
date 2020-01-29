import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./jwt.strategy";
import { SECRET } from "./constants";
import { AuthController } from "./auth.controller";
import { UsersModule } from "src/users/users.module";

@Module({
  providers: [AuthService, JwtStrategy],
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: SECRET,
      signOptions: {
        expiresIn: "100000000s"
      }
    })
  ],
  exports: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
