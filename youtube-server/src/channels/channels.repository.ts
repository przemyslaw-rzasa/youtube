import { Repository, EntityRepository } from "typeorm";
import {
  ConflictException,
  InternalServerErrorException
} from "@nestjs/common";

import { ERROR_CODES } from "src/constants/typeOrm";
import { UserTokenDataDto } from "src/auth/dto/user-token.dto";

import { Channel } from "./channel.entity";
import { CreateChannelDto } from "./dto/create-channel.dto";

import { UpdateChannelDto } from "./dto/update-channel.dto";
import { DeleteChannelDto } from "./dto/delete-channel.dto";
import { GetChannelDto } from "./dto/get-channel.dto";

@EntityRepository(Channel)
export class ChannelsRepository extends Repository<Channel> {
  async getChannel({ id }: GetChannelDto): Promise<Channel> {
    return await this.findOne({ id }, { relations: ["videos"] });
  }

  async createChannel(
    createChannelDto: CreateChannelDto,
    userTokenDataDto: UserTokenDataDto
  ): Promise<Channel> {
    const channel = new Channel();

    const payload = {
      ...createChannelDto,
      user: userTokenDataDto.id
    };

    channel.fromData(payload);

    try {
      await channel.save();

      delete channel.user;

      return channel;
    } catch (error) {
      if (error.code === ERROR_CODES.CONFLICT) {
        throw new ConflictException("Channel with this name already exists");
      }

      throw new InternalServerErrorException();
    }
  }

  async updateChannel(updateChannelDto: UpdateChannelDto): Promise<Channel> {
    const channel = await Channel.findOne({ id: updateChannelDto.id });

    channel.fromData(updateChannelDto);

    try {
      await channel.save();

      delete channel.user;

      return channel;
    } catch (error) {
      if (error.code === ERROR_CODES.CONFLICT) {
        throw new ConflictException("Channel with this name already exists");
      }

      throw new InternalServerErrorException();
    }
  }

  async deleteChannel({ id }: DeleteChannelDto): Promise<void> {
    const channel = await Channel.findOne({ id });

    await channel.remove();
  }
}
