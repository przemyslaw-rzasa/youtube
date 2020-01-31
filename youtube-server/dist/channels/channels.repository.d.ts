import { Repository } from "typeorm";
import { Channel } from "./channel.entity";
import { CreateChannelDto } from "./dto/create-channel.dto";
import { User } from "src/users/user.entity";
import { UpdateChannelDto } from "./dto/update-channel.dto";
import { DeleteChannelDto } from "./dto/delete-channel.dto";
export declare class ChannelsRepository extends Repository<Channel> {
    createChannel(createChannelDto: CreateChannelDto, user: User): Promise<Channel>;
    updateChannel(updateChannelDto: UpdateChannelDto): Promise<Channel>;
    deleteChannel({ id }: DeleteChannelDto): Promise<Channel>;
}
