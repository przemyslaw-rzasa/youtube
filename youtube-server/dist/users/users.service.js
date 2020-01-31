"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const users_repository_1 = require("./users.repository");
const user_entity_1 = require("./user.entity");
let UsersService = class UsersService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async createUser(createUserDto) {
        return await this.userRepository.createUser(createUserDto);
    }
    async updateUser(updateUserDto, user) {
        const updatesForeignUser = updateUserDto.id && updateUserDto.id !== user.id;
        const isAdmin = user.role === user_entity_1.Role.ADMIN;
        if (updatesForeignUser) {
            if (!isAdmin) {
                throw new common_1.MethodNotAllowedException();
            }
        }
        const newUserData = Object.assign({ id: updatesForeignUser ? updateUserDto.id : user.id }, updateUserDto);
        return await this.userRepository.updateUser(newUserData);
    }
    async deleteUser(deleteUserDto, user) {
        const deletesForeignUser = deleteUserDto.id && deleteUserDto.id !== user.id;
        const isAdmin = user.role === user_entity_1.Role.ADMIN;
        if (deletesForeignUser) {
            if (!isAdmin) {
                throw new common_1.MethodNotAllowedException();
            }
        }
        const id = deletesForeignUser ? deleteUserDto.id : user.id;
        return await this.userRepository.deleteUser(id);
    }
    async findOne(...data) {
        return this.userRepository.findOne(...data);
    }
};
UsersService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(users_repository_1.UserRepository)),
    __metadata("design:paramtypes", [users_repository_1.UserRepository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map