import type { DecisionDto } from "../dtos/decision.dto";

type DecisionCardProps = {
  decision: DecisionDto;
};

function DecisionCard({ decision }: DecisionCardProps) {
  return (
    <div className="flex items-stretch gap-4 border-2 border-[#25be97] bg-[#2b2b2b] p-3">
      {decision.image ? (
        <div className="w-14 h-14 shrink-0 self-center overflow-hidden rounded-md">
          <img src={`/decisionicons/${decision.image}`} className="w-full h-full object-cover" />
        </div>
      ) : (
        <div className="w-1 shrink-0 rounded-full bg-[#25be97]" />
      )}
      <div className="flex flex-col justify-center gap-1 min-w-0">
        <div className="text-white text-base font-bold text-left">{decision.name}</div>
        <div className="text-[#bbbbbb] text-sm text-left">{decision.description}</div>
      </div>
    </div>
  );
}

export default DecisionCard;
