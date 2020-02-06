import { BaseEntity, Entity } from "typeorm";
import { YoutubeEntity, FromData } from "src/utils/decorators/YoutubeEntity";

@YoutubeEntity()
@Entity()
export class Comment extends BaseEntity {
  fromData: FromData;

  constructor(data) {
    super();

    this.fromData(data);
  }
}
