"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const user_entity_1 = require("./user.entity");
let UserRepository = class UserRepository extends typeorm_1.Repository {
    async createUser(createUserDto) {
        const user = new user_entity_1.User();
        user.fromData(createUserDto);
        try {
            await user.create();
        }
        catch (error) {
            if (error.code === "23505") {
                throw new common_1.ConflictException("User with this email already exists");
            }
            throw new common_1.InternalServerErrorException();
        }
        return user;
    }
    async updateUser(userData) {
        const user = await user_entity_1.User.findOne({ id: userData.id });
        user.fromData(userData);
        await user.update({
            passwordChanged: !!userData.password
        });
        return user;
    }
};
UserRepository = __decorate([
    typeorm_1.EntityRepository(user_entity_1.User)
], UserRepository);
exports.UserRepository = UserRepository;
//# sourceMappingURL=users.repository.js.map