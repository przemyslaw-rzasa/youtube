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
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../users/user.entity");
let Channel = class Channel extends typeorm_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.fromData = data => {
            Object.entries(data).forEach(([key, value]) => (this[key] = value));
        };
        this.create = () => this.save();
        this.update = () => this.save();
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Channel.prototype, "id", void 0);
__decorate([
    typeorm_1.JoinColumn(),
    typeorm_1.ManyToOne(type => user_entity_1.User, user => user.channels, {
        eager: true,
        onDelete: "CASCADE"
    }),
    __metadata("design:type", user_entity_1.User)
], Channel.prototype, "user", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Channel.prototype, "name", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Channel.prototype, "description", void 0);
Channel = __decorate([
    typeorm_1.Entity(),
    typeorm_1.Unique(["name"])
], Channel);
exports.Channel = Channel;
//# sourceMappingURL=channel.entity.js.map