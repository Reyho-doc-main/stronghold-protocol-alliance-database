import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Select from "./Select";
import { TABS, SEASON_OPTIONS } from "../constants/navigation";

interface HeaderProps {
  currentPage: string;
  currentSeason: string;

  switchTab: (tab: string) => void;
  switchSeason: (season: string) => void;
}

const HeaderMobile = (props: HeaderProps) => {
  const { currentPage, currentSeason, switchTab, switchSeason } = props;
  const [toggleMobileMenu, setToggleMobileMenu] = useState<boolean>(false);

  return (
    <div className="w-full h-[10vh] max-h-14 bg-[#212121] fixed top-0 z-999 flex-row items-center justify-between px-4 flex lg:hidden">
      <div className="flex flex-row items-baseline gap-2">
        <div className="text-white text-lg">SPA Database</div>
        <div className="text-white text-[12px]">by Reyho + Silverglow (OG creator)</div>
      </div>

      <button
        className="w-8 h-8 bg-[#0bd5a5] flex justify-center items-center text-white text-center rounded-md"
        onClick={() => setToggleMobileMenu((prev) => !prev)}
      >
        <AiOutlineMenu />
      </button>
      <div
        className="absolute left-0 top-0 w-screen h-screen bg-[#2225] z-11 flex-row justify-end"
        style={{ display: toggleMobileMenu ? "flex" : "none" }}
        onClick={() => setToggleMobileMenu((prev) => !prev)}
      />
      <div
        className="fixed top-0 right-0 h-full w-40 z-12 bg-[#222] flex flex-col pt-5 gap-5 transition-transform duration-300"
        style={{ transform: toggleMobileMenu ? "translateX(0)" : "translateX(100%)" }}
      >
        {TABS.map((page) => (
          <button
            key={page}
            className="
						flex justify-center items-center
						text-md px-2 py-3 w-full"
            onClick={() => {
              if (page !== currentPage) {
                switchTab(page);
                setToggleMobileMenu((prev) => !prev);
              }
            }}
            style={{
              backgroundColor: page === currentPage ? "#00ffbb" : "transparent",
              color: page === currentPage ? "black" : "white",
              cursor: page === currentPage ? "default" : "pointer",
            }}
          >
            {page}
          </button>
        ))}
        <div className="px-3">
          <Select
            options={SEASON_OPTIONS}
            value={currentSeason}
            onChange={(season) => {
              switchSeason(season);
              setToggleMobileMenu((prev) => !prev);
            }}
            className="text-md"
          />
        </div>
      </div>
    </div>
  );
};

export default HeaderMobile;
