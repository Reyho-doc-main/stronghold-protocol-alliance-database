import type { OperatorDto } from "../dtos/operator.dto";

type BannedOperatorsPreviewProps = {
  operators: OperatorDto[];
};

function BannedOperatorsPreview({ operators }: BannedOperatorsPreviewProps) {
  return (
    <div className="flex flex-col gap-2 border-2 border-[#ef4444] bg-[#2b1414] rounded-xl p-3 max-w-96 md:max-w-195">
      <div className="text-white text-sm">
        {operators.length > 0
          ? `Banned operators (${operators.length})`
          : "No operators are currently banned."}
      </div>
      {operators.length > 0 && (
        <div className="flex flex-row flex-wrap gap-2 justify-center">
          {operators.map((operator) => (
            <div key={operator.name} className="flex flex-col items-center text-center w-12 shrink-0">
              <img
                src={`/operatoricons/90px-${operator.name.replace(/\s+/g, "_")}_icon.webp`}
                className="w-10 h-10"
              />
              <div className="text-white text-[9px] leading-tight">{operator.name}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BannedOperatorsPreview;
