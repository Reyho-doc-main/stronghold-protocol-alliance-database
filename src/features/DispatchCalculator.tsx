import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import type { OperatorDto } from "../dtos/operator.dto";
import type { DispatchEntity, DispatchModuleEntryDto } from "../dtos/dispatchModule.dto";
import {
  getOperatorsBySeason,
  getAlliancesBySeason,
  getImportantOperatorsBySeason,
} from "../utils/getDataBySeason";
import { getBannedAllianceTags, isOperatorBanned } from "../utils/banLogic";
import {
  computeDispatchPool,
  DISPATCH_TIER_LEVELS,
  formatDispatchOdds,
  hitProbability,
} from "../utils/dispatchPool";
import { SEASONS, DEFAULT_SEASON } from "../constants/navigation";
import AllianceButton from "../components/AllianceButton";
import TierButton from "../components/TierButton";
import DispatchModuleRow from "../components/DispatchModuleRow";
import DispatchEntityChip from "../components/DispatchEntityChip";

function readList(searchParams: URLSearchParams, key: string): string[] {
  const raw = searchParams.get(key);
  return raw ? raw.split(",").filter(Boolean) : [];
}

type DispatchSource = { key: string; entities: DispatchEntity[]; equippingAlliances: string[] };
function allianceSetKey(alliances: string[]): string {
  return JSON.stringify([...alliances].sort());
}

function groupByTagSet(operators: OperatorDto[]): DispatchSource[] {
  const groups = new Map<string, OperatorDto[]>();
  for (const op of operators) {
    const key = allianceSetKey(op.alliances);
    const group = groups.get(key);
    if (group) group.push(op);
    else groups.set(key, [op]);
  }
  return [...groups.entries()].map(([key, members]) => ({
    key: `pool:${key}`,
    entities: [...members]
      .sort((a, b) => a.tier - b.tier)
      .map((op): DispatchEntity => ({ type: "operator", name: op.name })),
    equippingAlliances: members[0].alliances,
  }));
}

function mergeSourcesByAlliances(rawSources: DispatchSource[]): DispatchSource[] {
  const merged = new Map<string, DispatchSource>();
  for (const source of rawSources) {
    const key = allianceSetKey(source.equippingAlliances);
    const existing = merged.get(key);
    if (existing) existing.entities.push(...source.entities);
    else merged.set(key, { ...source, key: `pool:${key}`, entities: [...source.entities] });
  }
  return [...merged.values()];
}

function simplifyTargets(
  importantInPool: OperatorDto[],
  targetAlliances: string[],
  namedOperators: Set<string>,
): DispatchEntity[] {
  const collapsed = new Set<string>();
  const allianceEntities: DispatchEntity[] = [];

  for (const alliance of targetAlliances) {
    const onlyByThisAlliance = importantInPool.filter(
      (op) => !collapsed.has(op.name) && !namedOperators.has(op.name) && op.alliances.includes(alliance),
    );
    if (onlyByThisAlliance.length >= 2) {
      for (const op of onlyByThisAlliance) collapsed.add(op.name);
      allianceEntities.push({ type: "alliance", name: alliance });
    }
  }

  const namedEntities: DispatchEntity[] = importantInPool
    .filter((op) => !collapsed.has(op.name))
    .map((op) => ({ type: "operator", name: op.name }));

  return [...namedEntities, ...allianceEntities];
}

function matchRank(name: string, query: string): number {
  const n = name.toLowerCase();
  const q = query.trim().toLowerCase();
  if (n === q) return 2;
  if (n.startsWith(q)) return 1;
  return 0;
}

function PickableChip({
  entity,
  isSelected,
  onClick,
}: {
  entity: DispatchEntity;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      title={isSelected ? "Click to remove" : "Click to add"}
      className={`rounded-md p-1 border-2 cursor-pointer transition-colors ${
        isSelected ? "border-[#25be97] bg-[#25be97]/10" : "border-transparent hover:border-[#3a3a3a]"
      }`}
    >
      <DispatchEntityChip entity={entity} />
    </button>
  );
}

function SearchField({
  value,
  onChange,
  onEnter,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  onEnter?: () => void;
  placeholder: string;
}) {
  return (
    <div className="h-10 px-3 flex flex-row items-center gap-2 border-2 rounded-xl border-gray-600 w-full max-w-xs">
      <AiOutlineSearch className="text-gray-400 shrink-0" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.nativeEvent.isComposing) onEnter?.();
        }}
        placeholder={placeholder}
        className="bg-transparent text-white placeholder-gray-400 outline-none w-full"
      />
    </div>
  );
}

function DispatchCalculator() {
  const [searchParams] = useSearchParams();
  const [helpOpen, setHelpOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState<number | null>(null);
  const [selectedAlliances, setSelectedAlliances] = useState<string[]>([]);
  const [selectedOperators, setSelectedOperators] = useState<string[]>([]);
  const [operatorSearch, setOperatorSearch] = useState("");
  const [targetOperators, setTargetOperators] = useState<string[]>([]);
  const [targetAlliances, setTargetAlliances] = useState<string[]>([]);
  const [targetSearch, setTargetSearch] = useState("");
  const [advanced, setAdvanced] = useState(false);

  const seasonParam = searchParams.get("season");
  const season = SEASONS.includes(seasonParam ?? "") ? seasonParam! : DEFAULT_SEASON;

  const bannedCore = readList(searchParams, "bannedCore");
  const bannedAddon = readList(searchParams, "bannedAddon");
  const manuallyUnbanned = readList(searchParams, "unbanned");

  const operatorData: OperatorDto[] = getOperatorsBySeason(season);
  const allianceData = getAlliancesBySeason(season);
  const curatedImportant = getImportantOperatorsBySeason(season);

  const bannedAllianceTags = getBannedAllianceTags(bannedCore, bannedAddon, season);
  const bannedOperatorNames = new Set(
    operatorData
      .filter((op) => isOperatorBanned(op, bannedAllianceTags, manuallyUnbanned))
      .map((op) => op.name),
  );

  const selectTier = (tier: number) => {
    setSelectedTier((prev) => (prev === tier ? null : tier));
  };

  const toggleAlliance = (name: string) => {
    setSelectedAlliances((prev) => (prev.includes(name) ? prev.filter((a) => a !== name) : [...prev, name]));
  };

  const toggleOperator = (name: string) => {
    setSelectedOperators((prev) => (prev.includes(name) ? prev.filter((a) => a !== name) : [...prev, name]));
  };

  const selectOperatorFromSearch = (name: string) => {
    toggleOperator(name);
    setOperatorSearch("");
  };

  const toggleTargetOperator = (name: string) => {
    setTargetOperators((prev) => (prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]));
  };

  const toggleTargetAlliance = (name: string) => {
    setTargetAlliances((prev) => (prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]));
  };

  const selectTargetFromSearch = (type: "operator" | "alliance", name: string) => {
    if (type === "operator") toggleTargetOperator(name);
    else toggleTargetAlliance(name);
    setTargetSearch("");
  };

  const clearAll = () => {
    setSelectedAlliances([]);
    setSelectedOperators([]);
    setOperatorSearch("");
    setTargetOperators([]);
    setTargetAlliances([]);
    setTargetSearch("");
  };

  const hasExplicitTargets = targetOperators.length > 0 || targetAlliances.length > 0;
  const isTargetOperator = (op: OperatorDto) => {
    if (hasExplicitTargets) {
      return (
        targetOperators.includes(op.name) || 
        op.alliances.some((a) => targetAlliances.includes(a))
      );
    }
    return curatedImportant.includes(op.name);
  };
  const maxEquipTier = selectedTier !== null ? selectedTier + 1 : null;

  const operatorSources: DispatchSource[] = selectedOperators
    .filter((name) => !bannedOperatorNames.has(name))
    .filter((name) => {
      const op = operatorData.find((o) => o.name === name);
      return maxEquipTier !== null && !!op && op.tier <= maxEquipTier;
    })
    .map((name) => ({
      key: `operator:${name}`,
      entities: [{ type: "operator", name }],
      equippingAlliances: operatorData.find((op) => op.name === name)?.alliances ?? [],
    }));

  const allianceMemberOperators =
    maxEquipTier === null
      ? []
      : operatorData.filter(
          (op) =>
            !bannedOperatorNames.has(op.name) &&
            op.tier <= maxEquipTier &&
            op.alliances.some((a) => selectedAlliances.includes(a)),
        );
  const allianceSources: DispatchSource[] = groupByTagSet(allianceMemberOperators);

  const sources: DispatchSource[] = mergeSourcesByAlliances(advanced ? operatorSources : allianceSources);

  const effectiveAlliances = [...new Set(sources.flatMap((s) => s.equippingAlliances))];

  const namedTargetOperators = new Set([...curatedImportant, ...targetOperators, ...selectedOperators]);

  const results =
    selectedTier === null
      ? []
      : sources
          .flatMap((source) => {
            const pool = computeDispatchPool(operatorData, source.equippingAlliances, selectedTier);
            const remainingPool = pool.filter((op) => !bannedOperatorNames.has(op.name));
            const importantInPool = remainingPool.filter(isTargetOperator);
            if (importantInPool.length === 0) return [];

            const collapseAlliances = hasExplicitTargets ? targetAlliances : source.equippingAlliances;
            const entry: DispatchModuleEntryDto = {
              sources: source.entities,
              targets: simplifyTargets(importantInPool, collapseAlliances, namedTargetOperators),
              odds: formatDispatchOdds(remainingPool.length, importantInPool.length),
            };
            const probability = hitProbability(remainingPool.length, importantInPool.length);
            return [{ source, entry, probability, poolSize: remainingPool.length }];
          })
          .sort((a, b) => b.probability - a.probability || a.poolSize - b.poolSize);

  const operatorMatches =
    maxEquipTier !== null && operatorSearch.trim().length > 0
      ? operatorData
          .filter(
            (op) =>
              !selectedOperators.includes(op.name) &&
              !bannedOperatorNames.has(op.name) &&
              op.tier <= maxEquipTier &&
              op.name.toLowerCase().includes(operatorSearch.trim().toLowerCase()),
          )
          .sort((a, b) => matchRank(b.name, operatorSearch) - matchRank(a.name, operatorSearch))
      : [];

  const targetOperatorMatches =
    targetSearch.trim().length > 0
      ? operatorData
          .filter(
            (op) =>
              !targetOperators.includes(op.name) &&
              !bannedOperatorNames.has(op.name) &&
              op.name.toLowerCase().includes(targetSearch.trim().toLowerCase()),
          )
          .sort((a, b) => matchRank(b.name, targetSearch) - matchRank(a.name, targetSearch))
      : [];

  const targetAllianceMatches =
    targetSearch.trim().length > 0
      ? allianceData
          .filter(
            (a) =>
              !targetAlliances.includes(a.name) && a.name.toLowerCase().includes(targetSearch.trim().toLowerCase()),
          )
          .sort((a, b) => matchRank(b.name, targetSearch) - matchRank(a.name, targetSearch))
      : [];

  const selectTopTargetMatch = () => {
    const topOperator = targetOperatorMatches[0];
    const topAlliance = targetAllianceMatches[0];
    if (!topOperator && !topAlliance) return;
    const operatorRank = topOperator ? matchRank(topOperator.name, targetSearch) : -1;
    const allianceRank = topAlliance ? matchRank(topAlliance.name, targetSearch) : -1;
    if (operatorRank >= allianceRank) selectTargetFromSearch("operator", topOperator!.name);
    else selectTargetFromSearch("alliance", topAlliance!.name);
  };

  const advancedSelectionCount = selectedOperators.length + targetOperators.length + targetAlliances.length;

  const hasAnySelection =
    selectedAlliances.length > 0 ||
    selectedOperators.length > 0 ||
    targetOperators.length > 0 ||
    targetAlliances.length > 0;

  return (
    <div className="min-h-screen bg-[#212121]">
      <div className="w-full h-[10vh] max-h-14 bg-[#212121] fixed top-0 z-50 flex items-center justify-between gap-2 px-4">
        <Link
          to={`/?season=${season}`}
          className="flex flex-row items-baseline gap-2 min-w-0 shrink whitespace-nowrap overflow-hidden"
        >
          <span className="text-white text-lg md:text-2xl hover:underline truncate">
            SPA Database
          </span>

          <span className="text-white text-[10px] md:text-xs hidden sm:inline">
            by Reyho + Silverglow (OG creator)
          </span>
        </Link>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-white text-[10px] md:text-sm text-right">
            Dispatch Guarantee Calculator
          </span>

        <button
          type="button"
          onClick={() => setHelpOpen(true)}
          className="h-full px-4 flex items-center text-white text-sm hover:text-[#25be97] transition-colors cursor-pointer"
        >
          Help
        </button>
        </div>
      </div>

      <div className="w-full flex flex-col mt-14 px-4 md:px-6 py-6 gap-4 text-left">
        <div className="border-2 border-[#25be97] bg-[#2b2b2b] flex flex-col gap-4 p-4">
          <div className="flex flex-col gap-3">
            <span className="text-white text-lg">Dispatch Center level</span>
            <div className="flex flex-row flex-wrap gap-2">
              {DISPATCH_TIER_LEVELS.map((tier) => (
                <TierButton
                  key={tier}
                  tier={tier}
                  isActive={selectedTier === tier}
                  onClick={() => selectTier(tier)}
                />
              ))}
            </div>
          </div>

          {selectedTier !== null && (
            <>
              <div className="flex flex-row items-center justify-between">
                <span className="text-white text-base">{advanced ? "Search by operator" : "By alliance"}</span>
                <div className="flex flex-row items-center gap-2">
                  {hasAnySelection && (
                    <button
                      onClick={clearAll}
                      className="h-9 px-3 flex flex-row justify-center items-center gap-2 border-2 rounded-xl border-gray-600 text-sm text-white cursor-pointer hover:border-red-400 hover:text-red-400"
                    >
                      Clear all
                    </button>
                  )}
                  <button
                    onClick={() => setAdvanced((prev) => !prev)}
                    className="h-9 px-3 flex flex-row justify-center items-center gap-2 border-2 rounded-xl border-gray-600 text-sm cursor-pointer"
                    style={{
                      backgroundColor: advanced ? "#25be97" : "transparent",
                      color: advanced ? "black" : "white",
                    }}
                  >
                    {advanced
                      ? "← Back"
                      : advancedSelectionCount > 0
                        ? `Advanced (${advancedSelectionCount})`
                        : "Advanced"}
                  </button>
                </div>
              </div>

              {!advanced && (
                <div className="flex flex-row flex-wrap gap-3">
                  {allianceData.map((alliance) => (
                    <AllianceButton
                      key={alliance.bondId}
                      allianceName={alliance.name}
                      isActive={selectedAlliances.includes(alliance.name)}
                      isImplied={effectiveAlliances.includes(alliance.name)}
                      onClick={() => toggleAlliance(alliance.name)}
                    />
                  ))}
                </div>
              )}

              {advanced && (
                <>
                  <div className="flex flex-col gap-2">
                    <span className="text-white text-base">Current operators</span>
                    <SearchField
                      value={operatorSearch}
                      onChange={setOperatorSearch}
                      onEnter={() => operatorMatches[0] && selectOperatorFromSearch(operatorMatches[0].name)}
                      placeholder="Search operator name..."
                    />
                    {(selectedOperators.length > 0 || operatorMatches.length > 0) && (
                      <div className="flex flex-row flex-wrap gap-1">
                        {selectedOperators.map((name) => (
                          <PickableChip
                            key={name}
                            entity={{ type: "operator", name }}
                            isSelected
                            onClick={() => toggleOperator(name)}
                          />
                        ))}
                        {operatorMatches.map((op) => (
                          <PickableChip
                            key={op.name}
                            entity={{ type: "operator", name: op.name }}
                            isSelected={false}
                            onClick={() => selectOperatorFromSearch(op.name)}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <span className="text-white text-base">Searching for</span>
                    <SearchField
                      value={targetSearch}
                      onChange={setTargetSearch}
                      onEnter={selectTopTargetMatch}
                      placeholder="Search operator or alliance..."
                    />
                    {(targetOperators.length > 0 ||
                      targetAlliances.length > 0 ||
                      targetOperatorMatches.length > 0 ||
                      targetAllianceMatches.length > 0) && (
                      <div className="flex flex-row flex-wrap gap-1">
                        {targetOperators.map((name) => (
                          <PickableChip
                            key={`operator:${name}`}
                            entity={{ type: "operator", name }}
                            isSelected
                            onClick={() => toggleTargetOperator(name)}
                          />
                        ))}
                        {targetAlliances.map((name) => (
                          <PickableChip
                            key={`alliance:${name}`}
                            entity={{ type: "alliance", name }}
                            isSelected
                            onClick={() => toggleTargetAlliance(name)}
                          />
                        ))}
                        {targetOperatorMatches.map((op) => (
                          <PickableChip
                            key={`operator:${op.name}`}
                            entity={{ type: "operator", name: op.name }}
                            isSelected={false}
                            onClick={() => selectTargetFromSearch("operator", op.name)}
                          />
                        ))}
                        {targetAllianceMatches.map((a) => (
                          <PickableChip
                            key={`alliance:${a.name}`}
                            entity={{ type: "alliance", name: a.name }}
                            isSelected={false}
                            onClick={() => selectTargetFromSearch("alliance", a.name)}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </>
              )}

              <div className="flex flex-row justify-end">
                <div className="text-xs text-[#888888] flex flex-col gap-1 text-right">
                  <span>
                    Season: <span className="text-white">{season}</span>
                  </span>
                  <span>
                    Banned alliances:{" "}
                    {bannedAllianceTags.size > 0 ? (
                      <span className="text-red-400">{[...bannedAllianceTags].join(", ")}</span>
                    ) : (
                      <span className="text-white">None</span>
                    )}
                  </span>
                </div>
              </div>
            </>
          )}
        </div>

        {selectedTier === null && (
          <p className="text-[#888888] text-sm">Select your Dispatch Center level to begin</p>
        )}

        {selectedTier !== null && (
          <>
            {sources.length === 0 && (
              <p className="text-[#888888] text-sm">Select an alliance or operator</p>
            )}

            {sources.length > 0 && results.length === 0 && (
              <p className="text-[#888888] text-sm">No results found.</p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
              {results.map(({ source, entry }) => (
                <DispatchModuleRow key={source.key} entry={entry} compactAllianceTargets />
              ))}
            </div>
          </>
        )}
      </div>
      {helpOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="bg-[#2b2b2b] border-2 border-gray-600 p-6 rounded-xl text-white max-w-sm w-full text-center shadow-xl">
            <h2 className="text-xl font-bold mb-2">Help</h2>
            <p className="text-[#888888] mb-6">
              Sorry, this page is temporarily not available.
            </p>
            <button 
              onClick={() => setHelpOpen(false)} 
              className="bg-[#25be97] text-black font-semibold my-3 py-2 px-4 rounded-lg border-gray-600 hover:bg-[#1da582] transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DispatchCalculator;
