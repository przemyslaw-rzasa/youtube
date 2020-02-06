import {
  Injectable,
  MethodNotAllowedException,
  NotFoundException
} from "@nestjs/common";
import { CreateChannelDto } from "./dto/create-channel.dto";
import { InjectRepository } from "@nestjs/typeorm";

import { UserTokenDataDto } from "src/auth/dto/user-token.dto";
import { isAdmin } from "src/utils/helpers/isAdmin";

import { Channel } from "./channel.entity";
import { UpdateChannelDto } from "./dto/update-channel.dto";
import { ChannelsRepository } from "./channels.repository";
import { DeleteChannelDto } from "./dto/delete-channel.dto";
import { GetChannelDto } from "./dto/get-channel.dto";
import { isChannelOwner } from "./helpers/isChannelOwner";

@Injectable()
export class ChannelsService {
  constructor(
    @InjectRepository(ChannelsRepository)
    private channelsRepository: ChannelsRepository
  ) {}

  async getChannel(getChannelDto: GetChannelDto): Promise<Channel> {
    return await this.channelsRepository.getChannel(getChannelDto);
  }

  async createChannel(
    createChannelDto: CreateChannelDto,
    userTokenDataDto: UserTokenDataDto
  ): Promise<Channel> {
    return await this.channelsRepository.createChannel(
      createChannelDto,
      userTokenDataDto
    );
  }

  async updateChannel(
    updateChannelDto: UpdateChannelDto,
    userTokenDataDto: UserTokenDataDto
  ): Promise<Channel> {
    const channel = await Channel.findOne(
      { id: updateChannelDto.id },
      { relations: ["user"] }
    );

    if (!channel) {
      throw new NotFoundException();
    }

    if (
      !isChannelOwner(channel, userTokenDataDto) &&
      !isAdmin(userTokenDataDto)
    ) {
      throw new MethodNotAllowedException();
    }

    return await this.channelsRepository.updateChannel(updateChannelDto);
  }

  async deleteChannel(
    deleteChannelDto: DeleteChannelDto,
    userTokenDataDto: UserTokenDataDto
  ): Promise<void> {
    const channel = await Channel.findOne(
      { id: deleteChannelDto.id },
      { relations: ["user"] }
    );

    if (!channel) {
      throw new NotFoundException();
    }

    if (
      !isChannelOwner(channel, userTokenDataDto) &&
      !isAdmin(userTokenDataDto)
    ) {
      throw new MethodNotAllowedException();
    }

    return await this.channelsRepository.deleteChannel(deleteChannelDto);
  }
}
