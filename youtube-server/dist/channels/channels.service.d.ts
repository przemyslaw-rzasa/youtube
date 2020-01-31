import { CreateChannelDto } from "./dto/create-channel.dto";
import { User } from "src/users/user.entity";
import { ChannelsRepository } from "./channels.repository";
import { UpdateChannelDto } from "./dto/update-channel.dto";
import { Channel } from "./channel.entity";
import { DeleteChannelDto } from "./dto/delete-channel.dto";
export declare class ChannelsService {
    private channelsRepository;
    constructor(channelsRepository: ChannelsRepository);
    createChannel(createChannelDto: CreateChannelDto, user: User): Promise<Channel>;
    updateChannel(updateChannelDto: UpdateChannelDto, user: User): Promise<Channel>;
    deleteChannel(deleteChannelDto: DeleteChannelDto, user: User): Promise<Channel>;
}
