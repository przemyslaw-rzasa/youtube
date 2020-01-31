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
const create_channel_dto_1 = require("./dto/create-channel.dto");
const channels_service_1 = require("./channels.service");
const get_user_decorator_1 = require("../auth/get-user.decorator");
const passport_1 = require("@nestjs/passport");
const update_channel_dto_1 = require("./dto/update-channel.dto");
const delete_channel_dto_1 = require("./dto/delete-channel.dto");
let ChannelsController = class ChannelsController {
    constructor(channelsService) {
        this.channelsService = channelsService;
    }
    createChannel(createChannelDto, user) {
        return this.channelsService.createChannel(createChannelDto, user);
    }
    updateChannel(updateChannelDto, user) {
        return this.channelsService.updateChannel(updateChannelDto, user);
    }
    deleteChannel(deleteChannelDto, user) {
        return this.channelsService.deleteChannel(deleteChannelDto, user);
    }
};
__decorate([
    common_1.Post(),
    common_1.HttpCode(201),
    common_1.UseGuards(passport_1.AuthGuard("jwt")),
    common_1.UsePipes(common_1.ValidationPipe),
    __param(0, common_1.Body()), __param(1, get_user_decorator_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_channel_dto_1.CreateChannelDto, Object]),
    __metadata("design:returntype", void 0)
], ChannelsController.prototype, "createChannel", null);
__decorate([
    common_1.Put(),
    common_1.UseGuards(passport_1.AuthGuard("jwt")),
    common_1.UsePipes(common_1.ValidationPipe),
    __param(0, common_1.Body()), __param(1, get_user_decorator_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_channel_dto_1.UpdateChannelDto, Object]),
    __metadata("design:returntype", void 0)
], ChannelsController.prototype, "updateChannel", null);
__decorate([
    common_1.Delete(),
    common_1.HttpCode(204),
    common_1.UseGuards(passport_1.AuthGuard("jwt")),
    __param(0, common_1.Body()), __param(1, get_user_decorator_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [delete_channel_dto_1.DeleteChannelDto, Object]),
    __metadata("design:returntype", void 0)
], ChannelsController.prototype, "deleteChannel", null);
ChannelsController = __decorate([
    common_1.Controller("channels"),
    __metadata("design:paramtypes", [channels_service_1.ChannelsService])
], ChannelsController);
exports.ChannelsController = ChannelsController;
//# sourceMappingURL=channels.controller.js.map