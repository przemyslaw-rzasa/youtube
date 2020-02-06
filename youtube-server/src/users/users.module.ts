import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { UserRepository } from "./users.repository";

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [TypeOrmModule.forFeature([UserRepository])],
  exports: [UsersService]
})
export class UsersModule {}
