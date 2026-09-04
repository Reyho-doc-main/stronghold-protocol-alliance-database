import AllianceButton from "../components/AllianceButton";
import SearchInput from "../components/SearchInput";
import TierButton from "../components/TierButton";
import EffectFilter from "../components/EffectFilter";
import OperatorCard from "../components/OperatorCard";
import type { OperatorDto } from "../dtos/operator.dto";
import { useState } from "react";
import type { AllianceDto } from "../dtos/alliance.dto";
import { getAlliancesBySeason, getOperatorsBySeason } from "../utils/getDataBySeason";

type AttributeListProps = {
  season: string;
};

const AttributeList = ({ season }: AttributeListProps) => {
  // console.log(season, "season list");
  const [activeCoreAlliances, setActiveCoreAlliances] = useState<string[]>([]);
  const [activeAddAlliances, setActiveAddAlliances] = useState<string[]>([]);
  const [activeTiers, setActiveTiers] = useState<number[]>([]);
  const [activeEffects, setActiveEffects] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const effectOptions = [
    "In Battle",
    "When Obtained",
    "When Sold",
    "On Deployment",
    "Rest Phase",
    "Direct Stack Buff",
  ];

  const toggleCoreAlliance = (alliance: string) => {
    if (activeCoreAlliances.includes(alliance))
      setActiveCoreAlliances((prev) => prev.filter((item) => item !== alliance));
    else setActiveCoreAlliances((prev) => [...prev, alliance]);
  };

  const toggleAddAlliance = (alliance: string) => {
    if (activeAddAlliances.includes(alliance))
      setActiveAddAlliances((prev) => prev.filter((item) => item !== alliance));
    else setActiveAddAlliances((prev) => [...prev, alliance]);
  };

  const toggleTiers = (tier: number) => {
    if (activeTiers.includes(tier)) setActiveTiers((prev) => prev.filter((item) => item !== tier));
    else setActiveTiers((prev) => [...prev, tier]);
  };

  const toggleEffect = (effect: string) => {
    if (activeEffects.includes(effect)) setActiveEffects((prev) => prev.filter((item) => item !== effect));
    else setActiveEffects((prev) => [...prev, effect]);
  };

  const allianceData: AllianceDto[] = getAlliancesBySeason(season);
  const coreAlliances = allianceData.filter((alliance) => alliance.core === true);
  const additionalAlliances = allianceData.filter(
    (alliance) => alliance.core !== true && alliance.noFilter !== true,
  );
  const operatorData: OperatorDto[] = getOperatorsBySeason(season);

  const filteredList = operatorData.filter(
    (op) =>
      activeCoreAlliances.every((a) => op.alliances.includes(a)) &&
      activeAddAlliances.every((a) => op.alliances.includes(a)) &&
      (activeTiers.length === 0 || activeTiers.includes(op.tier)) &&
      op.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      activeEffects.every((e) => op.effects?.includes(e)),
  );

  return (
    <>
      <div className="flex flex-col my-3 mx-4 gap-3 items-center">
        <div className="flex flex-row flex-wrap gap-3 justify-center">
          {[1, 2, 3, 4, 5, 6].map((tier) => (
            <TierButton
              key={tier}
              tier={tier}
              onClick={() => toggleTiers(tier)}
              isActive={activeTiers.includes(tier)}
            />
          ))}
          <EffectFilter
            options={effectOptions}
            activeEffects={activeEffects}
            onToggle={toggleEffect}
          />
          <SearchInput onSearch={setSearchTerm} placeholder="Search..." />
        </div>
        <div className="flex flex-row flex-wrap gap-3 justify-center max-w-96 md:max-w-195">
          {coreAlliances.map((alliance) => (
            <AllianceButton
              allianceName={alliance.name}
              key={alliance.bondId}
              isActive={activeCoreAlliances.includes(alliance.name)}
              onClick={() => toggleCoreAlliance(alliance.name)}
            />
          ))}
        </div>
        <div className="flex flex-row flex-wrap gap-3 justify-center max-w-96 md:max-w-195">
          {additionalAlliances.map((alliance) => (
            <AllianceButton
              allianceName={alliance.name}
              key={alliance.bondId}
              isActive={activeAddAlliances.includes(alliance.name)}
              onClick={() => toggleAddAlliance(alliance.name)}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 mx-6 mb-6 gap-6">
        {filteredList.map((operator) => (
          <OperatorCard operator={operator} />
        ))}
      </div>
    </>
  );
};

export default AttributeList;
