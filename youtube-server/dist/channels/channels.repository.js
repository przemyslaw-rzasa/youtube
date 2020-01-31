"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const channel_entity_1 = require("./channel.entity");
const user_entity_1 = require("../users/user.entity");
const common_1 = require("@nestjs/common");
const typeOrm_1 = require("../constants/typeOrm");
let ChannelsRepository = class ChannelsRepository extends typeorm_1.Repository {
    async createChannel(createChannelDto, user) {
        const channel = new channel_entity_1.Channel();
        const payload = Object.assign(Object.assign({}, createChannelDto), { user: user.id });
        channel.fromData(payload);
        try {
            await channel.create();
            return channel;
        }
        catch (error) {
            if (error.code === typeOrm_1.ERROR_CODES.CONFLICT) {
                throw new common_1.ConflictException("Channel with this name already exists");
            }
            throw new common_1.InternalServerErrorException();
        }
    }
    async updateChannel(updateChannelDto) {
        const channel = await channel_entity_1.Channel.findOne({ id: updateChannelDto.id });
        channel.fromData(updateChannelDto);
        try {
            await channel.update();
            return channel;
        }
        catch (error) {
            if (error.code === typeOrm_1.ERROR_CODES.CONFLICT) {
                throw new common_1.ConflictException("Channel with this name already exists");
            }
            throw new common_1.InternalServerErrorException();
        }
    }
    async deleteChannel({ id }) {
        const channel = await channel_entity_1.Channel.findOne({ id });
        return await channel.remove();
    }
};
ChannelsRepository = __decorate([
    typeorm_1.EntityRepository(channel_entity_1.Channel)
], ChannelsRepository);
exports.ChannelsRepository = ChannelsRepository;
//# sourceMappingURL=channels.repository.js.map