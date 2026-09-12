import AllianceButton from "../components/AllianceButton";
import SearchInput from "../components/SearchInput";
import TierButton from "../components/TierButton";
import EffectFilter, { type EffectOption } from "../components/EffectFilter";
import OperatorCard from "../components/OperatorCard";
import BanSelector from "../components/BanSelector";
import type { OperatorDto } from "../dtos/operator.dto";
import { useState } from "react";
import type { AllianceDto } from "../dtos/alliance.dto";
import { getAlliancesBySeason, getOperatorsBySeason } from "../utils/getDataBySeason";

const EXEMPT_FROM_BANS = "Reserve Operator - Supporter";

type AttributeListProps = {
  season: string;
};

const AttributeList = ({ season }: AttributeListProps) => {
  const [activeCoreAlliances, setActiveCoreAlliances] = useState<string[]>([]);
  const [activeAddAlliances, setActiveAddAlliances] = useState<string[]>([]);
  const [activeTiers, setActiveTiers] = useState<number[]>([]);
  const [activeEffects, setActiveEffects] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [showBanSelector, setShowBanSelector] = useState(false);
  const [bannedCore, setBannedCore] = useState<string[]>([]);
  const [bannedAddon, setBannedAddon] = useState<string[]>([]);
  const [manuallyUnbanned, setManuallyUnbanned] = useState<string[]>([]);
  const [hideBanned, setHideBanned] = useState(false);

  const effectOptions: EffectOption[] = [
    { value: "In Battle", label: "In Battle" },
    { value: "When Obtained", label: "When Obtained" },
    { value: "When Sold", label: "When Sold" },
    { value: "On Deployment", label: "On Deployment" },
    {
      value: "Rest Phase",
      label: "Rest Phase",
      children: [
        { value: "Rest Phase - Start", label: "Start" },
        { value: "Rest Phase - End", label: "End" },
      ],
    },
    { value: "Direct Stack Buff", label: "Direct Stack Buff" },
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
    if (activeEffects.includes(effect))
      setActiveEffects((prev) => prev.filter((item) => item !== effect));
    else setActiveEffects((prev) => [...prev, effect]);
  };

  const toggleCoreBan = (alliance: string) => {
    setBannedCore((prev) =>
      prev.includes(alliance) ? prev.filter((a) => a !== alliance) : [...prev, alliance],
    );
  };

  const toggleAddonBan = (alliance: string) => {
    setBannedAddon((prev) =>
      prev.includes(alliance) ? prev.filter((a) => a !== alliance) : [...prev, alliance],
    );
  };

  const toggleManualUnban = (operatorName: string) => {
    setManuallyUnbanned((prev) =>
      prev.includes(operatorName)
        ? prev.filter((name) => name !== operatorName)
        : [...prev, operatorName],
    );
  };

  const allianceData: AllianceDto[] = getAlliancesBySeason(season);
  const coreAlliances = allianceData.filter((alliance) => alliance.core === true);
  const additionalAlliances = allianceData.filter(
    (alliance) => alliance.core !== true && alliance.noFilter !== true,
  );
  const operatorData: OperatorDto[] = getOperatorsBySeason(season);

  // Making rest phase - start and end also be part of parent Rest Phase
  const getEffectMatchTags = (value: string): string[] => {
    const option = effectOptions.find((o) => o.value === value);
    return option ? [option.value, ...(option.children?.map((c) => c.value) ?? [])] : [value];
  };

  const maxCoreBans = season === "1" ? 2 : 3;
  const maxAddonBans = season === "1" ? 2 : 4;

  const clampedBannedCore = bannedCore.slice(0, maxCoreBans);
  const clampedBannedAddon = bannedAddon.slice(0, maxAddonBans);

  const bannedAllianceTags = new Set(
    [...clampedBannedCore, ...clampedBannedAddon].map((name) => name.replaceAll(" ", "_")),
  );

  const isOperatorBanned = (op: OperatorDto) => {
    if (op.name === EXEMPT_FROM_BANS) return false;
    if (manuallyUnbanned.includes(op.name)) return false;
    if (op.alliances.length === 0) return false;
    return op.alliances.every((tag) => bannedAllianceTags.has(tag));
  };

  const activeBanCount = clampedBannedCore.length + clampedBannedAddon.length;

  const filteredList = operatorData.filter(
    (op) =>
      activeCoreAlliances.every((a) => op.alliances.includes(a)) &&
      activeAddAlliances.every((a) => op.alliances.includes(a)) &&
      (activeTiers.length === 0 || activeTiers.includes(op.tier)) &&
      op.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      activeEffects.every((e) => getEffectMatchTags(e).some((tag) => op.effects?.includes(tag))) &&
      (!hideBanned || !isOperatorBanned(op)),
  );

  return (
    <>
      <div className="flex flex-col my-3 mx-4 gap-3 items-center">
        <div className="flex flex-row flex-wrap gap-3 justify-center items-center">
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
          <button
            className="h-10 px-3 flex flex-row justify-center items-center gap-2 border-2 rounded-xl border-gray-600 text-sm"
            style={{
              backgroundColor: activeBanCount > 0 ? "#ef4444" : "transparent",
              color: "white",
            }}
            onClick={() => setShowBanSelector((prev) => !prev)}
          >
            {activeBanCount > 0 ? `Bans (${activeBanCount})` : "Bans"}
          </button>
          <label className="flex flex-row items-center gap-2 text-white text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={hideBanned}
              onChange={(event) => setHideBanned(event.target.checked)}
            />
            Hide banned operators
          </label>
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

        {showBanSelector && (
          <BanSelector
            coreAlliances={coreAlliances}
            addonAlliances={additionalAlliances}
            bannedCore={clampedBannedCore}
            bannedAddon={clampedBannedAddon}
            onToggleCoreBan={toggleCoreBan}
            onToggleAddonBan={toggleAddonBan}
            maxCoreBans={maxCoreBans}
            maxAddonBans={maxAddonBans}
          />
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 mx-6 mb-6 gap-6">
        {filteredList.map((operator) => (
          <OperatorCard
            key={operator.name}
            operator={operator}
            isBanned={isOperatorBanned(operator)}
            onToggleBan={() => toggleManualUnban(operator.name)}
          />
        ))}
      </div>
    </>
  );
};

export default AttributeList;
