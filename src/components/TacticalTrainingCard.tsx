import type { TacticalTrainingDto } from "../dtos/tacticalTraining.dto";
import { highlightPlainText } from "../utils/highlightMatch";

type TacticalTrainingCardProps = {
  training: TacticalTrainingDto;
  onOpen: (id: string) => void;
  searchTerm?: string;
  matchedEnemy?: string;
};

function TacticalTrainingCard({
  training,
  onOpen,
  searchTerm = "",
  matchedEnemy,
}: TacticalTrainingCardProps) {
  return (
    <button
      onClick={() => onOpen(training.id)}
      className="relative w-full aspect-square border-3 border-[#25be97] overflow-hidden cursor-pointer hover:-translate-y-1 transition-transform duration-300"
    >
      <img src={`/enemyicons/${training.image}`} className="w-full h-full object-cover" />
      <div className="absolute bottom-0 left-0 w-full bg-[#212121]/70 text-white text-[12px] md:text-[14px] py-1 px-1 text-center">
        {highlightPlainText(training.name, searchTerm)}
        {matchedEnemy && (
          <div className="text-[10px] text-gray-300">
            Enemy: {highlightPlainText(matchedEnemy, searchTerm)}
          </div>
        )}
      </div>
    </button>
  );
}

export default TacticalTrainingCard;
