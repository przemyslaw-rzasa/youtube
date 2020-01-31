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

@Controller("channels")
export class ChannelsController {
  constructor(private channelsService: ChannelsService) {}

  @Post()
  @HttpCode(201)
  @UseGuards(AuthGuard("jwt"))
  @UsePipes(ValidationPipe)
  createChannel(@Body() createChannelDto: CreateChannelDto, @GetUser() user) {
    return this.channelsService.createChannel(createChannelDto, user);
  }

  @Put()
  @UseGuards(AuthGuard("jwt"))
  @UsePipes(ValidationPipe)
  updateChannel(@Body() updateChannelDto: UpdateChannelDto, @GetUser() user) {
    return this.channelsService.updateChannel(updateChannelDto, user);
  }

  @Delete()
  @HttpCode(204)
  @UseGuards(AuthGuard("jwt"))
  deleteChannel(@Body() deleteChannelDto: DeleteChannelDto, @GetUser() user) {
    return this.channelsService.deleteChannel(deleteChannelDto, user);
  }
}
