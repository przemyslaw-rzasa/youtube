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
import { GetChannelDto } from "./dto/get-channel.dto";
import { UserTokenDataDto } from "src/auth/dto/user-token.dto";

@Injectable()
export class ChannelsService {
  constructor(
    @InjectRepository(ChannelsRepository)
    private channelsRepository: ChannelsRepository
  ) {}

  async getChannel(getChannelDto: GetChannelDto): Promise<Channel> {
    return await await this.channelsRepository.getChannel(getChannelDto);
  }

  async createChannel(
    createChannelDto: CreateChannelDto,
    userTokenData: UserTokenDataDto
  ): Promise<Channel> {
    return await this.channelsRepository.createChannel(
      createChannelDto,
      userTokenData
    );
  }

  async updateChannel(
    updateChannelDto: UpdateChannelDto,
    userTokenData: UserTokenDataDto
  ): Promise<Channel> {
    const channel = await Channel.findOne(
      { id: updateChannelDto.id },
      { relations: ["user"] }
    );

    if (!channel) {
      throw new NotFoundException();
    }

    const updatesOwnChannel = userTokenData.id === channel.user.id;
    const isAdmin = userTokenData.role === Role.ADMIN;

    if (!updatesOwnChannel && !isAdmin) {
      throw new MethodNotAllowedException();
    }

    return await this.channelsRepository.updateChannel(updateChannelDto);
  }

  async deleteChannel(
    deleteChannelDto: DeleteChannelDto,
    userTokenData: UserTokenDataDto
  ): Promise<void> {
    const channel = await Channel.findOne(
      { id: deleteChannelDto.id },
      { relations: ["user"] }
    );

    if (!channel) {
      throw new NotFoundException();
    }

    const updatesOwnChannel = userTokenData.id === channel.user.id;
    const isAdmin = userTokenData.role === Role.ADMIN;

    if (!updatesOwnChannel && !isAdmin) {
      throw new MethodNotAllowedException();
    }

    return await this.channelsRepository.deleteChannel(deleteChannelDto);
  }
}
