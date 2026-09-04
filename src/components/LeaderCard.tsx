import type { LeaderDto } from "../dtos/leader.dto";
import { isRateLimited } from "../utils/rateLimit";

type LeaderCardProps = {
  leader: LeaderDto;
};

function LeaderCard({ leader }: LeaderCardProps) {
  const navigateToTerraWiki = () => {
    if (isRateLimited("wiki-link", 500)) return;
    window.open(leader.wikiLink, "_blank");
  };

  return (
    <button
      onClick={navigateToTerraWiki}
      className="relative w-full aspect-square border-3 border-[#25be97] overflow-hidden cursor-pointer hover:-translate-y-1 transition-transform duration-300"
    >
      <img src={`/leadericons/${leader.image}`} className="w-full h-full object-cover" />
      <div className="absolute bottom-0 left-0 w-full bg-[#212121]/70 text-white text-[12px] md:text-[14px] py-1 px-1 text-center">
        {leader.name}
      </div>
    </button>
  );
}

export default LeaderCard;
