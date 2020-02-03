import { Repository, EntityRepository } from "typeorm";
import { Channel } from "./channel.entity";
import { CreateChannelDto } from "./dto/create-channel.dto";
import { User } from "src/users/user.entity";
import {
  ConflictException,
  InternalServerErrorException
} from "@nestjs/common";
import { ERROR_CODES } from "src/constants/typeOrm";
import { UpdateChannelDto } from "./dto/update-channel.dto";
import { DeleteChannelDto } from "./dto/delete-channel.dto";

@EntityRepository(Channel)
export class ChannelsRepository extends Repository<Channel> {
  async createChannel(
    createChannelDto: CreateChannelDto,
    user: User
  ): Promise<Channel> {
    const channel = new Channel();

    const payload = {
      ...createChannelDto,
      user: user.id,
      userId: user.id
    };

    channel.fromData(payload);

    try {
      await channel.save();

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
