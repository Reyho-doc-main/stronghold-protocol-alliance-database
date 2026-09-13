import type { DispatchModuleSectionDto } from "../dtos/dispatchModule.dto";
import DispatchModuleRow from "./DispatchModuleRow";

type DispatchModuleSectionProps = {
  data: DispatchModuleSectionDto;
};

function PhaseGroup({
  title,
  entries,
}: {
  title: string;
  entries: DispatchModuleSectionDto["early"];
}) {
  if (entries.length === 0) return null;

  return (
    <div className="flex flex-col gap-2">
      <div className="text-[#25be97] font-bold text-sm">{title}</div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {entries.map((entry, index) => (
          <DispatchModuleRow key={index} entry={entry} />
        ))}
      </div>
    </div>
  );
}

function DispatchModuleSection({ data }: DispatchModuleSectionProps) {
  return (
    <div className="flex flex-col gap-4">
      <PhaseGroup title="Early game" entries={data.early} />
      <PhaseGroup title="If you have no choice" entries={data.noChoice} />
      <PhaseGroup title="Mid/late game" entries={data.midLate} />
    </div>
  );
}

export default DispatchModuleSection;
