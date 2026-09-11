import type { OperatorDto } from "../dtos/operator.dto";
import { isRateLimited } from "../utils/rateLimit";
import { ROMAN_NUMERALS, TIER_COLOR } from "../constants/tier";
import AllianceIconRow from "./AllianceIconRow";

type OperatorCardProps = {
  operator: OperatorDto;
};

function OperatorCard(props: OperatorCardProps) {
  const { operator } = props;

  const navigateToTerraWiki = (opName: string) => {
    if (isRateLimited("wiki-link", 500)) return;
    window.open(`https://arknights.wiki.gg/wiki/${opName}`, "_blank");
  };

  const getAttributeTypeImgLink = (name: string) => {
    if (name === "Specialized") return "/attributeicons/s_icon_support.png";
    if (name === "Combat") return "/attributeicons/s_icon_battle.png";
    if (name === "Prep") return "/attributeicons/s_icon_gold.png";
    return "/attributeicons/s_icon_bond.png";
  };

  return (
    <div className="w-full flex flex-row items-start justify-start px-4 gap-4">
      <div className="w-16 shrink-0 flex flex-col justify-start items-center text-center text-white leading-3.5 text-[12px] md:text-[14px]">
        <button
          className="relative cursor-pointer mb-1 hover:-translate-y-1 transition-transform duration-300"
          onClick={() => navigateToTerraWiki(operator.name)}
        >
          <img
            src={`/operatoricons/90px-${operator.name.replace(/\s+/g, "_")}_icon.webp`}
            className="w-16 h-16"
          />
          <div
            className={`
          absolute w-6 h-6 right-0 top-0 
          text-sm flex justify-center items-center
          bg-[#212121]/50 rounded-sm border-2 `}
            style={{
              color: TIER_COLOR[operator.tier],
              borderColor: TIER_COLOR[operator.tier],
            }}
          >
            {ROMAN_NUMERALS[operator.tier]}
          </div>
        </button>
        {operator.name}
      </div>

      <div className="flex flex-col justify-start items-start">
        <div className="pb-1">
          <AllianceIconRow alliances={operator.alliances} />
        </div>
        <div className="flex flex-row gap-3 text-black text-[10px] md:text-[12px]">
          <div className="px-1.5 mb-1 rounded-sm bg-[#8a8a8a] text-white flex flex-row gap-1 items-center justify-center">
            <img
              src={getAttributeTypeImgLink(operator.attributeType)}
              className="h-4 w-4 object-contain"
            />
            {operator.attributeType}
          </div>
        </div>
        <div
          className="text-sm text-white text-left whitespace-pre-wrap text-[10px] md:text-[14px]"
          dangerouslySetInnerHTML={{
            __html: operator.attribute,
          }}
        ></div>
      </div>
    </div>
  );
}
export default OperatorCard;
