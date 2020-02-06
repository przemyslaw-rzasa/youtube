import {
  Controller,
  Post,
  Body,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Put,
  Delete,
  HttpCode,
  Get
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

import { GetUser } from "src/auth/get-user.decorator";
import { UserTokenDataDto } from "src/auth/dto/user-token.dto";

import { Channel } from "./channel.entity";
import { ChannelsService } from "./channels.service";
import { CreateChannelDto } from "./dto/create-channel.dto";
import { UpdateChannelDto } from "./dto/update-channel.dto";
import { DeleteChannelDto } from "./dto/delete-channel.dto";
import { GetChannelDto } from "./dto/get-channel.dto";

@Controller("channels")
export class ChannelsController {
  constructor(private channelsService: ChannelsService) {}

  @Get()
  @HttpCode(200)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  getChannel(@Body() getChannelDto: GetChannelDto): Promise<Channel> {
    return this.channelsService.getChannel(getChannelDto);
  }

  @Post()
  @HttpCode(201)
  @UseGuards(AuthGuard("jwt"))
  @UsePipes(new ValidationPipe({ whitelist: true }))
  createChannel(
    @Body() createChannelDto: CreateChannelDto,
    @GetUser() userTokenDataDto: UserTokenDataDto
  ): Promise<Channel> {
    return this.channelsService.createChannel(
      createChannelDto,
      userTokenDataDto
    );
  }

  @Put()
  @HttpCode(201)
  @UseGuards(AuthGuard("jwt"))
  @UsePipes(new ValidationPipe({ whitelist: true }))
  updateChannel(
    @Body() updateChannelDto: UpdateChannelDto,
    @GetUser() userTokenDataDto: UserTokenDataDto
  ): Promise<Channel> {
    return this.channelsService.updateChannel(
      updateChannelDto,
      userTokenDataDto
    );
  }

  @Delete()
  @HttpCode(204)
  @UseGuards(AuthGuard("jwt"))
  @UsePipes(new ValidationPipe({ whitelist: true }))
  deleteChannel(
    @Body() deleteChannelDto: DeleteChannelDto,
    @GetUser() userTokenDataDto: UserTokenDataDto
  ): Promise<void> {
    return this.channelsService.deleteChannel(
      deleteChannelDto,
      userTokenDataDto
    );
  }
}
