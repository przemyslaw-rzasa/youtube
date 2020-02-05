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
import { CreateChannelDto } from "./dto/create-channel.dto";
import { ChannelsService } from "./channels.service";
import { GetUser } from "src/auth/get-user.decorator";
import { AuthGuard } from "@nestjs/passport";
import { UpdateChannelDto } from "./dto/update-channel.dto";
import { DeleteChannelDto } from "./dto/delete-channel.dto";
import { Channel } from "./channel.entity";
import { GetChannelDto } from "./dto/get-channel.dto";
import { UserTokenDataDto } from "src/auth/dto/user-token.dto";

@Controller("channels")
export class ChannelsController {
  constructor(private channelsService: ChannelsService) {}

  @Get()
  @HttpCode(201)
  @UseGuards(AuthGuard("jwt"))
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
    @GetUser() userTokenData: UserTokenDataDto
  ): Promise<Channel> {
    return this.channelsService.createChannel(createChannelDto, userTokenData);
  }

  @Put()
  @UseGuards(AuthGuard("jwt"))
  @UsePipes(new ValidationPipe({ whitelist: true }))
  updateChannel(
    @Body() updateChannelDto: UpdateChannelDto,
    @GetUser() userTokenData: UserTokenDataDto
  ): Promise<Channel> {
    return this.channelsService.updateChannel(updateChannelDto, userTokenData);
  }

  @Delete()
  @HttpCode(204)
  @UseGuards(AuthGuard("jwt"))
  deleteChannel(
    @Body() deleteChannelDto: DeleteChannelDto,
    @GetUser() userTokenData: UserTokenDataDto
  ): Promise<void> {
    return this.channelsService.deleteChannel(deleteChannelDto, userTokenData);
  }
}
