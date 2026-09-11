import type { MapDto } from "../dtos/map.dto";
import InstallationTable from "./InstallationTable";

type MapCardProps = {
  map: MapDto;
};

function MapCard({ map }: MapCardProps) {
  return (
    <div className="flex flex-col gap-3 border border-[#3a3a3a] bg-[#212121] p-3">
      <div className="text-lg text-white font-bold">{map.name}</div>

      {map.appearances && map.appearances.length > 0 && (
        <ul className="list-disc pl-5 text-[#bbbbbb] text-sm flex flex-col gap-1">
          {map.appearances.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      )}

      {map.terrainEffect && (
        <div className="border-2 border-[#25be97] bg-[#173b32] px-3 py-2 flex flex-col gap-1">
          <div className="text-white font-bold text-sm">{map.terrainEffect.title}</div>
          <div className="text-[#dddddd] text-sm">{map.terrainEffect.description}</div>
        </div>
      )}

      <img src={`/mapicons/${map.image}`} className="w-full" />

      {map.installation && <InstallationTable installation={map.installation} />}
    </div>
  );
}

export default MapCard;
