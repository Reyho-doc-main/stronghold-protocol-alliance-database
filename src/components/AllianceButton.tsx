import { getBondImage } from "../utils/getImageLink";

type AllianceButtonProps = {
  allianceName: string;
  isActive?: boolean;
  isImplied?: boolean;
  onClick?: () => void;
  activeColor?: string;
};

function AllianceButton(props: AllianceButtonProps) {
  const {
    allianceName,
    isActive = false,
    isImplied = false,
    onClick = () => {},
    activeColor = "#00ffbb",
  } = props;
  return (
    <button
      title={isImplied ? `${allianceName} is included because you selected` : undefined}
      className="
        flex flex-row justify-start items-center w-24 md:w-30
        gap-1 md:gap-3 px-2 py-1 md:px-3 md:py-1.5 shrink-0
        border-2 rounded-xl text-[10px] md:text-[14px]
      "
      style={{
        borderColor: isActive || isImplied ? activeColor : "#25be97",
        borderStyle: isImplied && !isActive ? "dashed" : "solid",
        backgroundColor: isActive ? activeColor : "transparent",
        color: isActive ? "black" : isImplied ? activeColor : "white",
      }}
      onClick={onClick}
    >
      <div
        id={allianceName}
        className={`
          w-5 h-5 md:w-7 md:h-7 shrink-0
          border-[#25be97] border rounded-full
          flex justify-center items-center
        `}
        style={{ background: "radial-gradient(#25be97, #212121 80%)" }}
      >
        <img
          className="
            w-[60%] h-[60%]
            md:w-[65%] md:h-[65%]
          "
          src={getBondImage(allianceName)}
        />
      </div>
      <div className="flex justify-center items-center w-full">
        {allianceName === "Assist_Operator" ? "Assist" : allianceName}
      </div>
    </button>
  );
}

export default AllianceButton;
