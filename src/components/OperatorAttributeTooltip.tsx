import { FiExternalLink } from "react-icons/fi";
import type { OperatorDto } from "../dtos/operator.dto";
import { isRateLimited } from "../utils/rateLimit";
import AllianceIconRow from "./AllianceIconRow";

interface OperatorAttributeTooltipProps {
  operator: OperatorDto;
}

function OperatorAttributeTooltip(props: OperatorAttributeTooltipProps) {
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
    <>
      <div className="flex flex-row justify-between items-start">
        <div>
          <div className="pb-2">
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
        </div>
        <FiExternalLink
          width={24}
          height={24}
          onClick={(e) => {
            e.stopPropagation();
            navigateToTerraWiki(operator.name);
          }}
        />
      </div>
      <div
        className="text-sm text-white text-left whitespace-pre-wrap text-[10px] md:text-[14px]"
        dangerouslySetInnerHTML={{
          __html: operator.attribute,
        }}
      ></div>
    </>
  );
}

export default OperatorAttributeTooltip;
