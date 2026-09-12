import type { ReactNode } from "react";
import type { DispatchEntity, DispatchModuleEntryDto } from "../dtos/dispatchModule.dto";
import DispatchEntityChip from "./DispatchEntityChip";

type DispatchModuleRowProps = {
  entry: DispatchModuleEntryDto;
};

function interleaveOr(entities: DispatchEntity[]): ReactNode[] {
  return entities.flatMap((entity, index) => {
    const nodes: ReactNode[] = [];
    if (index > 0) {
      nodes.push(
        <span key={`or-${entity.type}-${entity.name}`} className="text-[#888888] text-xs shrink-0">
          or
        </span>,
      );
    }
    nodes.push(<DispatchEntityChip key={`${entity.type}-${entity.name}`} entity={entity} />);
    return nodes;
  });
}

function DispatchModuleRow({ entry }: DispatchModuleRowProps) {
  return (
    <div className="flex flex-col gap-2 border-b border-[#3a3a3a] py-3 px-3 last:border-b-0">
      <div className="flex flex-row flex-wrap items-center gap-2">
        {interleaveOr(entry.sources)}
        <span className="text-[#25be97] text-xl shrink-0 mx-1">→</span>
        {interleaveOr(entry.targets)}
      </div>
      {(entry.odds || entry.note) && (
        <div className="flex flex-row flex-wrap gap-4 text-xs">
          {entry.odds && <span className="text-white/80">{entry.odds}</span>}
          {entry.note && <span className="italic text-[#888888]">{entry.note}</span>}
        </div>
      )}
    </div>
  );
}

export default DispatchModuleRow;
