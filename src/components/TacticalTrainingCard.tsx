import type { TacticalTrainingDto } from "../dtos/tacticalTraining.dto";

type TacticalTrainingCardProps = {
  training: TacticalTrainingDto;
  onOpen: (id: string) => void;
};

function TacticalTrainingCard({ training, onOpen }: TacticalTrainingCardProps) {
  return (
    <button
      onClick={() => onOpen(training.id)}
      className="relative w-full aspect-square border-3 border-[#25be97] overflow-hidden cursor-pointer hover:-translate-y-1 transition-transform duration-300"
    >
      <img src={`/enemyicons/${training.image}`} className="w-full h-full object-cover" />
      <div className="absolute bottom-0 left-0 w-full bg-[#212121]/70 text-white text-[12px] md:text-[14px] py-1 px-1 text-center">
        {training.name}
      </div>
    </button>
  );
}

export default TacticalTrainingCard;
