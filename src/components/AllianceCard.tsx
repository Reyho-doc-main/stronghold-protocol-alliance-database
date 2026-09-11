import { useState } from "react";
import {
  useFloating,
  offset,
  flip,
  shift,
  autoUpdate,
  useDismiss,
  useInteractions,
} from "@floating-ui/react";
import type { OperatorDto } from "../dtos/operator.dto";
import type { AllianceDto } from "../dtos/alliance.dto";
import { getBondImage } from "../utils/getImageLink";
import { ROMAN_NUMERALS, TIER_COLOR } from "../constants/tier";
import OperatorAttributeTooltip from "./OperatorAttributeTooltip";

type AllianceCardProps = {
  alliance: AllianceDto;
  operators: OperatorDto[];
};

function AllianceCard({ alliance, operators }: AllianceCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const [selectedOperator, setSelectedOperator] = useState<OperatorDto | null>(null);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: "bottom-start",

    whileElementsMounted: autoUpdate,

    middleware: [offset(8), flip(), shift({ padding: 8 })],
  });

  const dismiss = useDismiss(context, {
    outsidePress: () => {
      setIsPinned(false);
      return true;
    },
  });

  const { getFloatingProps } = useInteractions([dismiss]);

  return (
    <div className="w-full flex flex-col items-center justify-start">
      <div className="w-full flex flex-row items-start justify-start px-4 gap-4">
        <div
          className="
          w-18 shrink-0 flex flex-col justify-start
          items-center text-center text-white
          leading-4.5 text-[14px] md:text-[18px] gap-2"
        >
          <div
            className="w-18 h-18 border-3 border-[#25be97] flex justify-center items-center rounded-full"
            style={{ background: "radial-gradient(#25be97, #212121 80%)" }}
          >
            <img src={getBondImage(alliance.name)} className="w-12 h-12" />
          </div>
          {alliance.name.replaceAll("_", " ")}
        </div>
        <div className="flex items-start flex-col">
          <span className="text-sm text-white text-left text-[12px] md:text-[15px]">
            Requires <span className="green">{alliance.activeCount}</span>{" "}
            {alliance.activeCount == 1 ? "Operator" : "Operators"} to activate
          </span>
          <div
            className="text-sm text-white text-left whitespace-pre-wrap text-[12px] md:text-[15px]"
            dangerouslySetInnerHTML={{
              __html: alliance.desc,
            }}
          />
        </div>
      </div>
      <div className="flex flex-row flex-wrap justify-center">
        {operators.map((operator) => (
          <div
            key={operator.name}
            className="relative mb-1 cursor-pointer"
            onMouseEnter={(event) => {
              if (isPinned) return;

              refs.setReference(event.currentTarget);
              setSelectedOperator(operator);
              setIsOpen(true);
            }}
            onMouseLeave={() => {
              if (!isPinned) {
                setIsOpen(false);
              }
            }}
            onClick={(event) => {
              refs.setReference(event.currentTarget);
              setSelectedOperator(operator);
              setIsPinned(true);
              setIsOpen(true);
            }}
          >
            <img
              src={`/operatoricons/90px-${operator.name.replace(/\s+/g, "_")}_icon.webp`}
              className="w-14 h-14"
            />
            <div
              className={`
              absolute w-5 h-5 right-0 top-0 
              text-[12px] flex justify-center items-center
              bg-[#212121]/50 rounded-xs border-2 `}
              style={{
                color: TIER_COLOR[operator.tier],
                borderColor: TIER_COLOR[operator.tier],
              }}
            >
              {ROMAN_NUMERALS[operator.tier]}
            </div>
            {isOpen && selectedOperator === operator && (
              <div
                ref={refs.setFloating}
                style={floatingStyles}
                {...getFloatingProps()}
                className="
                  z-100
                  w-75
                  rounded-xl
                  border-2 border-[#00ffbb]
                  bg-[#212121]
                  px-4 py-3
                "
              >
                <OperatorAttributeTooltip operator={operator} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllianceCard;
