import { BaseEntity } from "typeorm";
import { Channel } from "src/channels/channel.entity";
export declare class Video extends BaseEntity {
    id: number;
    channel: Channel;
    name: string;
    description: string;
    href: string;
}
