import { Stat } from "./stat.entity";
import { EntityRepository, Repository } from "typeorm";
import { PostFeedbackDto } from "./dto/post-feedback.dto";
import { UserTokenDataDto } from "src/auth/dto/user-token.dto";

@EntityRepository(Stat)
export class StatsRepository extends Repository<Stat> {
  async postFeedback(
    { videoId, thumb }: PostFeedbackDto,
    userTokenDataDto: UserTokenDataDto
  ) {
    const stats = await Stat.findOne({ video: videoId as unknown });

    // If there was no reaction before, create one
    if (!stats) {
      const stats = new Stat({
        video: videoId,
        user: userTokenDataDto.id,
        thumb
      });

      stats.save();

      return stats;
    }

    /**
     * If reaction is same as saved one, it means that
     * user is undoing it
     */
    if (stats.thumb === thumb) {
      return await stats.remove();
    }

    /**
     * If reaction is opposite to the current one, update
     */
    stats.thumb = thumb;

    return stats.save();
  }
}
