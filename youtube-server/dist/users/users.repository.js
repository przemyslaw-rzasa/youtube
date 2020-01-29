"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const bcrypt = require("bcryptjs");
const common_1 = require("@nestjs/common");
const user_entity_1 = require("./user.entity");
let UserRepository = class UserRepository extends typeorm_1.Repository {
    async createUser(createUserDto) {
        const user = new user_entity_1.User();
        const salt = await bcrypt.genSalt();
        user.email = createUserDto.email;
        user.salt = salt;
        user.password = await bcrypt.hash(createUserDto.password, salt);
        try {
            await user.save();
        }
        catch (error) {
            if (error.code === "23505") {
                throw new common_1.ConflictException("User with this email already exists");
            }
            throw new common_1.InternalServerErrorException();
        }
        delete user.salt;
        delete user.password;
        return user;
    }
    async updateUser(updateUserDto) { }
};
UserRepository = __decorate([
    typeorm_1.EntityRepository(user_entity_1.User)
], UserRepository);
exports.UserRepository = UserRepository;
//# sourceMappingURL=users.repository.js.map