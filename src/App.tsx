import { AiOutlineUp } from "react-icons/ai";
import AttributeList from "./features/AttributeList";
import AllianceList from "./features/AllianceList";
import StrategyList from "./features/StrategyList";
import ShopItemList from "./features/ShopItemList";
import EnemyList from "./features/EnemyList";
import { useSearchParams } from "react-router-dom";
import HeaderDesktop from "./components/HeaderDesktop";
import HeaderMobile from "./components/HeaderMobile";
import Home from "./features/Home";
import { TABS, SEASONS, DEFAULT_SEASON, type Tab } from "./constants/navigation";

function App() {
  const [searchParams, setSearchParams] = useSearchParams();

  const season = searchParams.get("season");
  const currentSeason = SEASONS.includes(season ?? "") ? season! : DEFAULT_SEASON;

  const page = searchParams.get("tab");
  const currentPage: Tab = (TABS as readonly string[]).includes(page ?? "")
    ? (page as Tab)
    : "Home";

  const switchTab = (tab: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("tab", tab);
    setSearchParams(params, { replace: true });
  };

  const switchSeason = (season: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("season", season);
    setSearchParams(params, { replace: true });
  };

  return (
    <div className="w-full min-h-screen bg-[#212121] relative">
      <HeaderDesktop
        currentPage={currentPage}
        currentSeason={currentSeason}
        switchTab={switchTab}
        switchSeason={switchSeason}
      />
      <HeaderMobile
        currentPage={currentPage}
        currentSeason={currentSeason}
        switchTab={switchTab}
        switchSeason={switchSeason}
      />
      <div className="w-full flex flex-col mt-14">
        {currentPage === "Home" && <Home />}
        {currentPage === "Attributes" && <AttributeList season={currentSeason} />}
        {currentPage === "Alliances" && <AllianceList season={currentSeason} />}
        {currentPage === "Strategies" && <StrategyList season={currentSeason} />}
        {currentPage === "Items" && <ShopItemList season={currentSeason} />}
        {currentPage === "Advanced" && <EnemyList season={currentSeason} />}
      </div>
      {currentPage !== "Home" && (
        <div className="fixed bottom-5 right-5 z-10">
          <button
            className="w-8 h-8 bg-[#0bd5a5] flex justify-center items-center text-white text-center rounded-md"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <AiOutlineUp />
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
