import type { DispatchEntity } from "../dtos/dispatchModule.dto";
import { getBondImage } from "../utils/getImageLink";

type DispatchEntityChipProps = {
  entity: DispatchEntity;
};

function DispatchEntityChip({ entity }: DispatchEntityChipProps) {
  const label = entity.type === "alliance" ? `${entity.name} Operator` : entity.name;

  return (
    <div className="flex flex-col items-center text-center w-16 shrink-0 gap-1">
      {entity.type === "alliance" ? (
        <div
          className="w-14 h-14 rounded-full border-2 border-[#25be97] flex justify-center items-center"
          style={{ background: "radial-gradient(#25be97, #212121 80%)" }}
        >
          <img src={getBondImage(entity.name)} className="w-9 h-9" />
        </div>
      ) : (
        <img
          src={`/operatoricons/90px-${entity.name.replace(/\s+/g, "_")}_icon.webp`}
          className="w-14 h-14"
        />
      )}
      <div className="text-white text-[10px] md:text-[12px] leading-tight">{label}</div>
    </div>
  );
}

export default DispatchEntityChip;
