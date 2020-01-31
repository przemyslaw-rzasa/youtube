import { CreateChannelDto } from "./dto/create-channel.dto";
import { ChannelsService } from "./channels.service";
import { UpdateChannelDto } from "./dto/update-channel.dto";
import { DeleteChannelDto } from "./dto/delete-channel.dto";
export declare class ChannelsController {
    private channelsService;
    constructor(channelsService: ChannelsService);
    createChannel(createChannelDto: CreateChannelDto, user: any): Promise<import("./channel.entity").Channel>;
    updateChannel(updateChannelDto: UpdateChannelDto, user: any): Promise<import("./channel.entity").Channel>;
    deleteChannel(deleteChannelDto: DeleteChannelDto, user: any): Promise<import("./channel.entity").Channel>;
}
