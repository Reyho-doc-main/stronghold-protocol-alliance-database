import { useState } from "react";
import type { ShopItemDto } from "../dtos/shopItem.dto";
import { getItemsBySeason } from "../utils/getDataBySeason";
import { groupShopItemsBySearch } from "../utils/searchShopItems";
import { useSearchHotkey } from "../hooks/useSearchHotkey";
import { highlightHtml, highlightPlainText } from "../utils/highlightMatch";
import { ROMAN_NUMERALS, TIER_COLOR } from "../constants/tier";
import SearchInput from "../components/SearchInput";
import CyclingIcon from "../components/CyclingIcon";

const mumuballCombinationsSeason1: Record<string, string[]> = {
  yanship: ["trap_1040_acarm040"],
  victoriaship: [
    "trap_1041_acarm041",
    "trap_1042_acarm042",
    "trap_1043_acarm043",
    "trap_1044_acarm044",
    "trap_1045_acarm045",
  ],
  egirship: ["trap_1046_acarm046"],
  steadship: ["trap_1047_acarm047"],
  sargonship: ["trap_1050_acarm050"],
  indomship: ["trap_1056_acarm056"],
  lateranoship: ["trap_1057_acarm057"],
  kjeragship: ["trap_1062_acarm062"],
  preciship: ["trap_1063_acarm063"],
  raidship: ["trap_1064_acarm064"],
  swiftship: ["trap_1051_acarm051"],
};

const mumuballCombinationsSeason2: Record<string, string[]> = {
  yanship: ["trap_1040_acarm040"],
  victoriaship: [
    "trap_1041_acarm041",
    "trap_1042_acarm042",
    "trap_1043_acarm043",
    "trap_1044_acarm044",
    "trap_1045_acarm045",
  ],
  egirship: ["trap_1046_acarm046"],
  steadship: ["trap_1047_acarm047"],
  sargonship: ["trap_1050_acarm050"],
  siracusaship: ["trap_1121_acarm121"],
  kazimierzship: ["trap_1119_acarm119"],
  indomship: ["trap_1056_acarm056"],
  lateranoship: ["trap_1057_acarm057"],
  kjeragship: ["trap_1062_acarm062"],
  preciship: ["trap_1063_acarm063"],
  raidship: ["trap_1064_acarm064"],
  swiftship: ["trap_1051_acarm051"],
  arcaneship: ["trap_1048_acarm048"],
};

type ShopItemListProps = {
  season: string;
};

type ShopItemEntryProps = {
  item: ShopItemDto;
  searchTerm: string;
};

function ShopItemEntry({ item, searchTerm }: ShopItemEntryProps) {
  return (
    <div className="w-full flex flex-row items-start justify-start px-4 gap-4">
      <div
        className="
        w-18 shrink-0 flex flex-col justify-start
        items-center text-center text-white
        leading-4.5 text-[14px] md:text-[18px] gap-2"
      >
        <div className="w-18 h-18 border-3 border-[#25be97] relative">
          <div className="flex justify-center items-center w-full h-full">
            <img src={`/shopitemicons/${item.iconLink}.png`} className="h-4/5 w-4/5 object-contain" />
          </div>
          {item.tier && (
            <div
              className={`
              absolute w-6 h-6 right-0 top-0 
              text-sm flex justify-center items-center
              bg-[#212121]/50 rounded-sm border-2 `}
              style={{
                color: TIER_COLOR[item.tier],
                borderColor: TIER_COLOR[item.tier],
              }}
            >
              {ROMAN_NUMERALS[item.tier]}
            </div>
          )}
        </div>
        {highlightPlainText(item.itemName, searchTerm)}
      </div>
      <div className="flex items-start flex-col text-sm  text-left whitespace-pre-wrap text-[12px] md:text-[15px]">
        {item.cost && (
          <div className="flex text-[#ffaa00] align-baseline">
            {item.cost}
            <img src={"/fund.png"} className="object-contain" />
          </div>
        )}
        <div
          className="text-white"
          dangerouslySetInnerHTML={{
            __html: highlightHtml(item.effectDesc, searchTerm),
          }}
        />
      </div>
    </div>
  );
}

const ShopItemList = ({ season }: ShopItemListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { isVisible, inputRef, hide } = useSearchHotkey(false);

  const items: ShopItemDto[] = getItemsBySeason(season);
  const searchGroups = groupShopItemsBySearch(items, searchTerm);

  const mumuballCombinations =
    season !== "1" ? mumuballCombinationsSeason2 : mumuballCombinationsSeason1;

  return (
    <>
      <div className="flex justify-center mx-6 mt-3 mb-3">
        {isVisible && (
          <SearchInput
            ref={inputRef}
            onSearch={setSearchTerm}
            onClose={hide}
            placeholder="Search items..."
          />
        )}
      </div>

      {searchGroups === null && (
        <div className="grid grid-cols md:grid-cols-3 mx-6 mb-6 gap-6">
          {items.map((item) => (
            <ShopItemEntry key={item.itemName} item={item} searchTerm="" />
          ))}
        </div>
      )}

      {searchGroups?.length === 0 && (
        <p className="text-center text-gray-400 mb-6">No items match "{searchTerm}".</p>
      )}

      {searchGroups?.map((group) => (
        <div key={group.category} className="mx-6 mb-8">
          <div className="flex flex-row items-center gap-3 mb-3">
            <h3 className="text-white text-sm font-semibold uppercase tracking-wide">{group.label}</h3>
            <div className="flex-1 h-px bg-gray-600" />
            <span className="text-gray-400 text-xs">{group.items.length}</span>
          </div>
          <div className="grid grid-cols md:grid-cols-3 gap-6">
            {group.items.map((item) => (
              <ShopItemEntry key={item.itemName} item={item} searchTerm={searchTerm} />
            ))}
          </div>
        </div>
      ))}

      <div>
        <div className="text-2xl">Damazti Isomorph equipments:</div>
        <div className="grid grid-cols-1 md:grid-cols-3 mx-6 mb-6 mt-6 gap-6">
          {Object.keys(mumuballCombinations).map((key) => {
            const item = items.filter((i) =>
              mumuballCombinations[key].find((value) => value === i.iconLink),
            );
            return (
              <div
                key={key}
                className="flex flex-row justify-center items-center gap-6 text-white text-2xl"
              >
                <div className="w-18 h-18 border-3 border-[#25be97] flex justify-center items-center">
                  <div className="w-4/5 h-4/5">
                    <img
                      src={`/shopitemicons/trap_1073_acgarm073.png`}
                      className="h-full w-full object-contain"
                    />
                  </div>
                </div>
                +
                {item.length === 1 ? (
                  <div className="w-18 h-18 border-3 border-[#25be97] flex justify-center items-center">
                    <div className="w-4/5 h-4/5">
                      <img
                        src={`/shopitemicons/${item[0].iconLink}.png`}
                        className="h-full w-full object-contain"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="w-18 h-18 border-3 border-[#25be97] flex justify-center items-center">
                    <div className="w-4/5 h-4/5">
                      <CyclingIcon iconLinks={item.map((i) => i.iconLink)} />
                    </div>
                  </div>
                )}
                =
                <div className="w-18 h-18 border-3 border-[#25be97] flex justify-center items-center">
                  <div className="w-4/5 h-4/5">
                    <img
                      src={`/bondicons/icon_${key}.png`}
                      className="h-full w-full object-contain"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ShopItemList;
