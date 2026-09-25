import AllianceButton from "../components/AllianceButton";
import SearchInput from "../components/SearchInput";
import TierButton from "../components/TierButton";
import EffectFilter, { type EffectOption } from "../components/EffectFilter";
import OperatorCard from "../components/OperatorCard";
import BanSelector from "../components/BanSelector";
import BannedOperatorsPreview from "../components/BannedOperatorsPreview";
import type { OperatorDto } from "../dtos/operator.dto";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import type { AllianceDto } from "../dtos/alliance.dto";
import { getAlliancesBySeason, getOperatorsBySeason } from "../utils/getDataBySeason";
import { groupOperatorsBySearch } from "../utils/searchOperators";
import { useSearchHotkey } from "../hooks/useSearchHotkey";
import { getMaxBanCounts, getBannedAllianceTags, isOperatorBanned as checkOperatorBanned } from "../utils/banLogic";

type AttributeListProps = {
  season: string;
};

const readListParam = (searchParams: URLSearchParams, key: string): string[] => {
  const raw = searchParams.get(key);
  return raw ? raw.split(",").filter(Boolean) : [];
};

const readBoolParam = (searchParams: URLSearchParams, key: string): boolean =>
  searchParams.get(key) === "1";

const AttributeList = ({ season }: AttributeListProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [activeCoreAlliances, setActiveCoreAlliances] = useState<string[]>([]);
  const [activeAddAlliances, setActiveAddAlliances] = useState<string[]>([]);
  const [activeTiers, setActiveTiers] = useState<number[]>([]);
  const [activeEffects, setActiveEffects] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { inputRef: searchInputRef } = useSearchHotkey(true);

  const [showBanSelector, setShowBanSelector] = useState(false);
  const [bannedCore, setBannedCore] = useState<string[]>(() =>
    readListParam(searchParams, "bannedCore"),
  );
  const [bannedAddon, setBannedAddon] = useState<string[]>(() =>
    readListParam(searchParams, "bannedAddon"),
  );
  const [manuallyUnbanned, setManuallyUnbanned] = useState<string[]>(() =>
    readListParam(searchParams, "unbanned"),
  );
  const [hideBanned, setHideBanned] = useState<boolean>(() => readBoolParam(searchParams, "hideBanned"));
  const [displayBannedIcons, setDisplayBannedIcons] = useState<boolean>(() =>
    readBoolParam(searchParams, "showBannedIcons"),
  );
  const [shareCopied, setShareCopied] = useState(false);

  const effectOptions: EffectOption[] = [
    { value: "In Battle", label: "In Battle" },
    { value: "When Obtained", label: "When Obtained" },
    { value: "When Sold", label: "When Sold" },
    { value: "On Deployment", label: "On Deployment" },
    {
      value: "Rest Phase",
      label: "Rest Phase",
      children: [
        { value: "Rest Phase - Start", label: "Starts" },
        { value: "Rest Phase - End", label: "Ends" },
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

  // Making URL sync with ban state
  useEffect(() => {
    setSearchParams(
      (prev) => {
        const params = new URLSearchParams(prev);
        if (bannedCore.length > 0) params.set("bannedCore", bannedCore.join(","));
        else params.delete("bannedCore");
        if (bannedAddon.length > 0) params.set("bannedAddon", bannedAddon.join(","));
        else params.delete("bannedAddon");
        if (manuallyUnbanned.length > 0) params.set("unbanned", manuallyUnbanned.join(","));
        else params.delete("unbanned");
        if (hideBanned) params.set("hideBanned", "1");
        else params.delete("hideBanned");
        if (displayBannedIcons) params.set("showBannedIcons", "1");
        else params.delete("showBannedIcons");
        return params;
      },
      { replace: true },
    );
  }, [
    bannedCore,
    bannedAddon,
    manuallyUnbanned,
    hideBanned,
    displayBannedIcons,
    setSearchParams,
  ]);

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

  const { core: maxCoreBans, addon: maxAddonBans } = getMaxBanCounts(season);

  const clampedBannedCore = bannedCore.slice(0, maxCoreBans);
  const clampedBannedAddon = bannedAddon.slice(0, maxAddonBans);

  const bannedAllianceTags = getBannedAllianceTags(bannedCore, bannedAddon, season);

  const isOperatorBanned = (op: OperatorDto) =>
    checkOperatorBanned(op, bannedAllianceTags, manuallyUnbanned);

  const bannedOperators = operatorData.filter(isOperatorBanned);
  const activeBanCount = clampedBannedCore.length + clampedBannedAddon.length;

  const handleShare = async () => {
    const shareUrl = window.location.href;

    try {
      await navigator.clipboard.writeText(shareUrl);
    } catch {
      window.prompt("Copy this link:", shareUrl);
      return;
    }

    setShareCopied(true);
    setTimeout(() => setShareCopied(false), 2000);
  };

  const preSearchList = operatorData.filter(
    (op) =>
      activeCoreAlliances.every((a) => op.alliances.includes(a)) &&
      activeAddAlliances.every((a) => op.alliances.includes(a)) &&
      (activeTiers.length === 0 || activeTiers.includes(op.tier)) &&
      activeEffects.every((e) => getEffectMatchTags(e).some((tag) => op.effects?.includes(tag))) &&
      (!hideBanned || !isOperatorBanned(op)),
  );

  const searchGroups = groupOperatorsBySearch(preSearchList, searchTerm);

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
          <SearchInput ref={searchInputRef} onSearch={setSearchTerm} placeholder="Search..." />
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
          <div className="flex flex-col gap-1">
            <label className="flex flex-row items-center gap-2 text-white text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={displayBannedIcons}
                onChange={(event) => setDisplayBannedIcons(event.target.checked)}
              />
              Display banned operator icons
            </label>
            <label className="flex flex-row items-center gap-2 text-white text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={hideBanned}
                onChange={(event) => setHideBanned(event.target.checked)}
              />
              Hide banned operator icons
            </label>
          </div>
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
            onShare={handleShare}
            shareCopied={shareCopied}
          />
        )}

        {displayBannedIcons && <BannedOperatorsPreview operators={bannedOperators} />}
      </div>

      {searchGroups === null && (
        <div className="grid grid-cols-1 md:grid-cols-3 mx-6 mb-6 gap-6">
          {preSearchList.map((operator) => (
            <OperatorCard
              key={operator.name}
              operator={operator}
              isBanned={isOperatorBanned(operator)}
              onToggleBan={() => toggleManualUnban(operator.name)}
            />
          ))}
        </div>
      )}

      {searchGroups?.length === 0 && (
        <p className="text-center text-gray-400 mb-6">No operators match "{searchTerm}".</p>
      )}

      {searchGroups?.map((group) => (
        <div key={group.category} className="mx-6 mb-8">
          <div className="flex flex-row items-center gap-3 mb-3">
            <h3 className="text-white text-sm font-semibold uppercase tracking-wide">{group.label}</h3>
            <div className="flex-1 h-px bg-gray-600" />
            <span className="text-gray-400 text-xs">{group.operators.length}</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {group.operators.map((operator) => (
              <OperatorCard
                key={operator.name}
                operator={operator}
                isBanned={isOperatorBanned(operator)}
                onToggleBan={() => toggleManualUnban(operator.name)}
                searchTerm={searchTerm}
                matchedAlliance={group.matchedAlliance[operator.name]}
              />
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default AttributeList;
