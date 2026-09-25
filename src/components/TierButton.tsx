import { ROMAN_NUMERALS } from "../constants/tier";

type TierButtonProps = {
  tier: number;
  isActive?: boolean;
  onClick?: () => void;
};

function TierButton(props: TierButtonProps) {
  const { tier, isActive = false, onClick = () => {} } = props;
  return (
    <button
      className={`
        w-10 h-10 flex justify-center items-center
        border-2 rounded-xl border-gray-600 
        ${isActive ? "bg-[#00ffbb]" : ""}
        ${isActive ? "text-black" : "text-white"}
      `}
      onClick={onClick}
    >
      {ROMAN_NUMERALS[tier]}
    </button>
  );
}

export default TierButton;
