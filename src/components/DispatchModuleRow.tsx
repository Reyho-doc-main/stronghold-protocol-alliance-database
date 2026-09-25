import type { ReactNode } from "react";
import type { DispatchEntity, DispatchModuleEntryDto } from "../dtos/dispatchModule.dto";
import DispatchEntityChip from "./DispatchEntityChip";
import { getBondImage } from "../utils/getImageLink";

function AllianceIconBadge({ name }: { name: string }) {
  return (
    <div
      title={`${name} Operator`}
      className="w-6 h-6 rounded-full border border-[#25be97] flex justify-center items-center shrink-0"
      style={{ background: "radial-gradient(#25be97, #212121 80%)" }}
    >
      <img src={getBondImage(name)} className="w-4 h-4" />
    </div>
  );
}

type DispatchModuleRowProps = {
  entry: DispatchModuleEntryDto;
  compactAllianceTargets?: boolean;
};

function interleaveOr(entities: DispatchEntity[], group: "source" | "target"): ReactNode[] {
  return entities.flatMap((entity, index) => {
    const nodes: ReactNode[] = [];
    if (index > 0) {
      nodes.push(
        <span
          key={`${group}-or-${entity.type}-${entity.name}`}
          className="text-[#888888] text-xs shrink-0"
        >
          or
        </span>,
      );
    }
    nodes.push(
      <DispatchEntityChip key={`${group}-${entity.type}-${entity.name}`} entity={entity} />,
    );
    return nodes;
  });
}

function DispatchModuleRow({ entry, compactAllianceTargets = false }: DispatchModuleRowProps) {
  const allianceTargets = compactAllianceTargets
    ? entry.targets.filter((target) => target.type === "alliance")
    : [];

  return (
    <div className="h-full flex flex-col gap-2 border border-[#3a3a3a] rounded-md bg-[#1c1c1c] p-3">
      <div className="flex flex-row flex-wrap items-center gap-2">
        {interleaveOr(entry.sources, "source")}
        <span className="text-[#25be97] text-xl shrink-0 mx-1">→</span>
        {interleaveOr(entry.targets, "target")}
      </div>
      {(entry.odds || entry.note || allianceTargets.length > 0) && (
        <div className="flex flex-row items-end justify-between gap-2 text-xs mt-auto pt-2 border-t border-[#2e2e2e]">
          <div className="flex flex-col gap-1">
            {entry.odds && <span className="text-white/80 font-medium">{entry.odds}</span>}
            {entry.note && <span className="italic text-[#888888]">{entry.note}</span>}
          </div>
          {allianceTargets.length > 0 && (
            <div className="flex flex-row items-center gap-1 shrink-0">
              {allianceTargets.map((target) => (
                <AllianceIconBadge key={`target-alliance-${target.name}`} name={target.name} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default DispatchModuleRow;
