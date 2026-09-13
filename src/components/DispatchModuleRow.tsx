import type { ReactNode } from "react";
import type { DispatchEntity, DispatchModuleEntryDto } from "../dtos/dispatchModule.dto";
import DispatchEntityChip from "./DispatchEntityChip";

type DispatchModuleRowProps = {
  entry: DispatchModuleEntryDto;
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

function DispatchModuleRow({ entry }: DispatchModuleRowProps) {
  return (
    <div className="h-full flex flex-col gap-2 border border-[#3a3a3a] rounded-md bg-[#1c1c1c] p-3">
      <div className="flex flex-row flex-wrap items-center gap-2">
        {interleaveOr(entry.sources, "source")}
        <span className="text-[#25be97] text-xl shrink-0 mx-1">→</span>
        {interleaveOr(entry.targets, "target")}
      </div>
      {(entry.odds || entry.note) && (
        <div className="flex flex-col gap-1 text-xs mt-auto pt-2 border-t border-[#2e2e2e]">
          {entry.odds && <span className="text-white/80 font-medium">{entry.odds}</span>}
          {entry.note && <span className="italic text-[#888888]">{entry.note}</span>}
        </div>
      )}
    </div>
  );
}

export default DispatchModuleRow;
