import { AiOutlineRight } from "react-icons/ai";

type DecisionCategoryButtonProps = {
  title: string;
  image?: string;
  onOpen: () => void;
};

function DecisionCategoryButton({ title, image, onOpen }: DecisionCategoryButtonProps) {
  return (
    <button
      onClick={onOpen}
      className="flex items-center gap-3 w-full border-2 border-[#25be97] bg-[#2b2b2b] px-4 py-3 cursor-pointer hover:-translate-y-1 transition-transform duration-300"
    >
      {image && (
        <div className="w-10 h-10 shrink-0 overflow-hidden rounded-md">
          <img src={`/decisionicons/${image}`} className="w-full h-full object-cover" />
        </div>
      )}
      <div className="text-white text-lg text-left flex-1">{title}</div>
      <AiOutlineRight className="text-white shrink-0" />
    </button>
  );
}

export default DecisionCategoryButton;
