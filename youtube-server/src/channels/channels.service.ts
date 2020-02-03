import {
  Injectable,
  MethodNotAllowedException,
  NotFoundException
} from "@nestjs/common";
import { CreateChannelDto } from "./dto/create-channel.dto";
import { User, Role } from "src/users/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { ChannelsRepository } from "./channels.repository";
import { UpdateChannelDto } from "./dto/update-channel.dto";
import { Channel } from "./channel.entity";
import { DeleteChannelDto } from "./dto/delete-channel.dto";

@Injectable()
export class ChannelsService {
  constructor(
    @InjectRepository(ChannelsRepository)
    private channelsRepository: ChannelsRepository
  ) {}

  async createChannel(
    createChannelDto: CreateChannelDto,
    user: User
  ): Promise<Channel> {
    return await this.channelsRepository.createChannel(createChannelDto, user);
  }

  async updateChannel(
    updateChannelDto: UpdateChannelDto,
    user: User
  ): Promise<Channel> {
    const channel = await Channel.findOne(
      { id: updateChannelDto.id },
      { relations: ["user"] }
    );

    if (!channel) {
      throw new NotFoundException();
    }

    const updatesOwnChannel = user.id === channel.user.id;
    const isAdmin = user.role === Role.ADMIN;

    if (!updatesOwnChannel && !isAdmin) {
      throw new MethodNotAllowedException();
    }

    return await this.channelsRepository.updateChannel(updateChannelDto);
  }

  async deleteChannel(
    deleteChannelDto: DeleteChannelDto,
    user: User
  ): Promise<void> {
    const channel = await Channel.findOne(
      { id: deleteChannelDto.id },
      { relations: ["user"] }
    );

    if (!channel) {
      throw new NotFoundException();
    }

    const updatesOwnChannel = user.id === channel.user.id;
    const isAdmin = user.role === Role.ADMIN;

    if (!updatesOwnChannel && !isAdmin) {
      throw new MethodNotAllowedException();
    }

    return await this.channelsRepository.deleteChannel(deleteChannelDto);
  }
}
