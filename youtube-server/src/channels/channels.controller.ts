import {
  Controller,
  Post,
  Body,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Put,
  Delete,
  HttpCode
} from "@nestjs/common";
import { CreateChannelDto } from "./dto/create-channel.dto";
import { ChannelsService } from "./channels.service";
import { GetUser } from "src/auth/get-user.decorator";
import { AuthGuard } from "@nestjs/passport";
import { UpdateChannelDto } from "./dto/update-channel.dto";
import { DeleteChannelDto } from "./dto/delete-channel.dto";
import { Channel } from "./channel.entity";

@Controller("channels")
export class ChannelsController {
  constructor(private channelsService: ChannelsService) {}

  @Post()
  @HttpCode(201)
  @UseGuards(AuthGuard("jwt"))
  @UsePipes(new ValidationPipe({ whitelist: true }))
  createChannel(
    @Body() createChannelDto: CreateChannelDto,
    @GetUser() user
  ): Promise<Channel> {
    return this.channelsService.createChannel(createChannelDto, user);
  }

  @Put()
  @UseGuards(AuthGuard("jwt"))
  @UsePipes(new ValidationPipe({ whitelist: true }))
  updateChannel(
    @Body() updateChannelDto: UpdateChannelDto,
    @GetUser() user
  ): Promise<Channel> {
    return this.channelsService.updateChannel(updateChannelDto, user);
  }

  @Delete()
  @HttpCode(204)
  @UseGuards(AuthGuard("jwt"))
  deleteChannel(
    @Body() deleteChannelDto: DeleteChannelDto,
    @GetUser() user
  ): Promise<void> {
    return this.channelsService.deleteChannel(deleteChannelDto, user);
  }
}
