import { useState } from "react";
import type { OperatorDto } from "../dtos/operator.dto";
import type { AllianceDto } from "../dtos/alliance.dto";
import { getAlliancesBySeason, getOperatorsBySeason } from "../utils/getDataBySeason";
import { groupAlliancesBySearch } from "../utils/searchAlliances";
import { useSearchHotkey } from "../hooks/useSearchHotkey";
import SearchInput from "../components/SearchInput";
import AllianceCard from "../components/AllianceCard";

type AllianceListProps = {
  season: string;
};

const AllianceList = ({ season }: AllianceListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { isVisible, inputRef, hide } = useSearchHotkey(false);

  const allianceData: AllianceDto[] = getAlliancesBySeason(season);
  const operatorData: OperatorDto[] = getOperatorsBySeason(season);

  const operatorsByAlliance = new Map<string, OperatorDto[]>(
    allianceData.map((alliance) => [
      alliance.bondId,
      operatorData.filter((op) => op.alliances.includes(alliance.name.replaceAll(" ", "_"))),
    ]),
  );

  const searchGroups = groupAlliancesBySearch(allianceData, operatorsByAlliance, searchTerm);

  return (
    <>
      <div className="flex justify-center mx-6 mt-3 mb-3">
        {isVisible && (
          <SearchInput
            ref={inputRef}
            onSearch={setSearchTerm}
            onClose={hide}
            placeholder="Search alliances..."
          />
        )}
      </div>

      {searchGroups === null && (
        <div className="grid grid-cols-1 md:grid-cols-2 mx-6 mb-6 gap-6">
          {allianceData.map((alliance) => (
            <AllianceCard
              key={alliance.bondId}
              alliance={alliance}
              operators={operatorsByAlliance.get(alliance.bondId) ?? []}
            />
          ))}
        </div>
      )}

      {searchGroups?.length === 0 && (
        <p className="text-center text-gray-400 mb-6">No alliances match "{searchTerm}".</p>
      )}

      {searchGroups?.map((group) => (
        <div key={group.category} className="mx-6 mb-8">
          <div className="flex flex-row items-center gap-3 mb-3">
            <h3 className="text-white text-sm font-semibold uppercase tracking-wide">{group.label}</h3>
            <div className="flex-1 h-px bg-gray-600" />
            <span className="text-gray-400 text-xs">{group.alliances.length}</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {group.alliances.map((alliance) => (
              <AllianceCard
                key={alliance.bondId}
                alliance={alliance}
                operators={operatorsByAlliance.get(alliance.bondId) ?? []}
                searchTerm={searchTerm}
                matchedOperator={group.matchedOperator[alliance.bondId]}
              />
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default AllianceList;
