import Select from "./Select";
import { TABS, SEASON_OPTIONS } from "../constants/navigation";

interface HeaderProps {
  currentPage: string;
  currentSeason: string;

  switchTab: (tab: string) => void;
  switchSeason: (season: string) => void;
}

const HeaderDesktop = (props: HeaderProps) => {
  const { currentPage, currentSeason, switchTab, switchSeason } = props;

  return (
    <div className="w-full h-[10vh] max-h-14 bg-[#212121] fixed top-0 z-999 flex-row items-center justify-between gap-4 px-4 hidden lg:flex">
      <div className="flex flex-row items-baseline gap-2 shrink-0 whitespace-nowrap">
        <div className="text-white text-2xl">SPA Database</div>
        <div className="text-white text-xs">by Reyho + Silverglow (OG creator)</div>
      </div>

      <div className="flex flex-row gap-5 h-full">
        {currentPage !== "Home" && (
          <div className="flex justify-center items-center shrink-0">
            <Select options={SEASON_OPTIONS} value={currentSeason} onChange={switchSeason} />
          </div>
        )}
        <div className="flex flex-row gap-5 h-full overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab}
              className="
                flex justify-center items-center shrink-0 whitespace-nowrap
                text-black text-lg px-2 h-full"
              onClick={() => (tab === currentPage ? {} : switchTab(tab))}
              style={{
                backgroundColor: tab === currentPage ? "#00ffbb" : "#212121",
                cursor: tab === currentPage ? "default" : "pointer",
                color: tab === currentPage ? "black" : "white",
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeaderDesktop;
