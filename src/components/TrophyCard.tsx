type TrophyCardProps = {
  range: string;
  image?: string;
};

function TrophyCard({ range, image }: TrophyCardProps) {
  return (
    <div className="flex flex-col border-2 border-[#25be97] overflow-hidden">
      <div className="bg-[#173b32] text-white text-center text-sm font-bold py-1 px-1">{range}</div>
      <div className="aspect-square bg-[#111111] flex items-center justify-center p-2">
        {image ? (
          <img src={`/trophyicons/${image}`} className="w-full h-full object-contain" />
        ) : (
          <span className="text-[#555555] text-xs text-center">No icon yet</span>
        )}
      </div>
    </div>
  );
}

export default TrophyCard;
