import { useEffect, useState } from "react";

type CyclingIconProps = {
  iconLinks: string[];
  intervalMs?: number;
};

function CyclingIcon({ iconLinks, intervalMs = 1000 }: CyclingIconProps) {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);

  const currentIcon = iconLinks.length > 0 ? iconLinks[tick % iconLinks.length] : undefined;

  return <img src={`/shopitemicons/${currentIcon}.png`} className="h-full w-full object-contain" />;
}

export default CyclingIcon;
