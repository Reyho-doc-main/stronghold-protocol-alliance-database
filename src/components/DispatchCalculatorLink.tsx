import { useSearchParams } from "react-router-dom";

function DispatchCalculatorLink() {
  const [searchParams] = useSearchParams();

  const openCalculator = () => {
    const params = new URLSearchParams();
    const season = searchParams.get("season");
    if (season) params.set("season", season);
    for (const key of ["bannedCore", "bannedAddon", "unbanned"]) {
      const value = searchParams.get(key);
      if (value) params.set(key, value);
    }
    window.open(`/dispatch-calculator?${params.toString()}`, "_blank", "noopener,noreferrer");
  };

  return (
    <button
      onClick={openCalculator}
      className="text-xs font-semibold text-[#25be97] border-2 border-[#25be97] rounded-md px-3 py-1.5 cursor-pointer hover:bg-[#25be97]/10 transition-colors"
    >
      Dispatch Module Calculator ↗
    </button>
  );
}

export default DispatchCalculatorLink;
