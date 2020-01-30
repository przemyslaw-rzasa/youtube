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
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcryptjs");
const typeorm_1 = require("typeorm");
const channel_entity_1 = require("../channels/channel.entity");
var Role;
(function (Role) {
    Role["ADMIN"] = "admin";
    Role["USER"] = "user";
})(Role = exports.Role || (exports.Role = {}));
let User = class User extends typeorm_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.role = Role.USER;
        this.fromData = data => {
            Object.entries(data).forEach(([key, value]) => (this[key] = value));
        };
        this.validatePassword = async (password) => {
            const hashedPassword = await bcrypt.hash(password, this.salt);
            return hashedPassword === this.password;
        };
        this.hashPassword = async () => {
            this.salt = await bcrypt.genSalt();
            this.password = await bcrypt.hash(this.password, this.salt);
        };
        this.create = async () => {
            this.hashPassword();
            await this.save();
            delete this.password;
            delete this.salt;
        };
        this.update = async ({ passwordChanged }) => {
            if (passwordChanged) {
                this.hashPassword();
            }
            await this.save();
            delete this.password;
            delete this.salt;
        };
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], User.prototype, "salt", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    typeorm_1.OneToMany(type => channel_entity_1.Channel, channel => channel),
    __metadata("design:type", Array)
], User.prototype, "channels", void 0);
User = __decorate([
    typeorm_1.Entity(),
    typeorm_1.Unique(["email"])
], User);
exports.User = User;
//# sourceMappingURL=user.entity.js.map