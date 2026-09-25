import { useState } from "react";
import type { StrategyDto } from "../dtos/strategy.dto";
import { getStrategiesBySeason } from "../utils/getDataBySeason";
import { groupStrategiesBySearch } from "../utils/searchStrategies";
import { useSearchHotkey } from "../hooks/useSearchHotkey";
import { highlightHtml, highlightPlainText } from "../utils/highlightMatch";
import SearchInput from "../components/SearchInput";

type StrategyListProps = {
  season: string;
};

type StrategyEntryProps = {
  strategy: StrategyDto;
  searchTerm: string;
};

function StrategyEntry({ strategy, searchTerm }: StrategyEntryProps) {
  return (
    <div className="w-full flex flex-row items-start justify-start px-4 gap-4">
      <div
        className="
					w-18 shrink-0 flex flex-col justify-start
					items-center text-center text-white
					leading-4.5 text-[14px] md:text-[18px] gap-2"
      >
        <div className="w-18 h-18 border-3 border-[#25be97] flex justify-center items-center">
          <img src={`/bandicons/${strategy.iconLink}.png`} className="w-full h-full" />
        </div>
        {highlightPlainText(strategy.name, searchTerm)}
        <div className="flex align-baseline flex-row items-center text-white text-[16px]">
          <div className="h-4">
            <img src="/Life_Points.webp" className="h-4 object-cover mr-2" />
          </div>
          {strategy.initialHp}
        </div>
      </div>
      <div className="flex items-start flex-col">
        <div
          className="text-sm text-white text-left whitespace-pre-wrap text-[12px] md:text-[15px]"
          dangerouslySetInnerHTML={{
            __html: highlightHtml(strategy.effectDesc, searchTerm),
          }}
        />
      </div>
    </div>
  );
}

const StrategyList = ({ season }: StrategyListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { isVisible, inputRef, hide } = useSearchHotkey(false);

  const strats: StrategyDto[] = getStrategiesBySeason(season);
  const searchGroups = groupStrategiesBySearch(strats, searchTerm);

  return (
    <>
      <div className="flex justify-center mx-6 mt-3 mb-3">
        {isVisible && (
          <SearchInput
            ref={inputRef}
            onSearch={setSearchTerm}
            onClose={hide}
            placeholder="Search strategies..."
          />
        )}
      </div>

      {searchGroups === null && (
        <div className="grid grid-cols-1 md:grid-cols-3 mx-6 mb-6 gap-6">
          {strats.map((strategy) => (
            <StrategyEntry key={strategy.name} strategy={strategy} searchTerm="" />
          ))}
        </div>
      )}

      {searchGroups?.length === 0 && (
        <p className="text-center text-gray-400 mb-6">No strategies match "{searchTerm}".</p>
      )}

      {searchGroups?.map((group) => (
        <div key={group.category} className="mx-6 mb-8">
          <div className="flex flex-row items-center gap-3 mb-3">
            <h3 className="text-white text-sm font-semibold uppercase tracking-wide">{group.label}</h3>
            <div className="flex-1 h-px bg-gray-600" />
            <span className="text-gray-400 text-xs">{group.strategies.length}</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {group.strategies.map((strategy) => (
              <StrategyEntry key={strategy.name} strategy={strategy} searchTerm={searchTerm} />
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default StrategyList;
