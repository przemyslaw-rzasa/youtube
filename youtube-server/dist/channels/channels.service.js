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
const user_entity_1 = require("../users/user.entity");
const typeorm_1 = require("@nestjs/typeorm");
const channels_repository_1 = require("./channels.repository");
const channel_entity_1 = require("./channel.entity");
let ChannelsService = class ChannelsService {
    constructor(channelsRepository) {
        this.channelsRepository = channelsRepository;
    }
    async createChannel(createChannelDto, user) {
        return await this.channelsRepository.createChannel(createChannelDto, user);
    }
    async updateChannel(updateChannelDto, user) {
        const channel = await channel_entity_1.Channel.findOne({ id: updateChannelDto.id });
        if (!channel) {
            throw new common_1.NotFoundException();
        }
        const updatesOwnChannel = user.id === channel.user.id;
        const isAdmin = user.role === user_entity_1.Role.ADMIN;
        if (!updatesOwnChannel && !isAdmin) {
            throw new common_1.MethodNotAllowedException();
        }
        return await this.channelsRepository.updateChannel(updateChannelDto);
    }
    async deleteChannel(deleteChannelDto, user) {
        const channel = await channel_entity_1.Channel.findOne({ id: deleteChannelDto.id });
        if (!channel) {
            throw new common_1.NotFoundException();
        }
        const updatesOwnChannel = user.id === channel.user.id;
        const isAdmin = user.role === user_entity_1.Role.ADMIN;
        if (!updatesOwnChannel && !isAdmin) {
            throw new common_1.MethodNotAllowedException();
        }
        return await this.channelsRepository.deleteChannel(deleteChannelDto);
    }
};
ChannelsService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(channels_repository_1.ChannelsRepository)),
    __metadata("design:paramtypes", [channels_repository_1.ChannelsRepository])
], ChannelsService);
exports.ChannelsService = ChannelsService;
//# sourceMappingURL=channels.service.js.map