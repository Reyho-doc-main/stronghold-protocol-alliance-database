import { getBondImage } from "../utils/getImageLink";

type AllianceIconRowProps = {
  alliances: string[];
};

function AllianceIconRow({ alliances }: AllianceIconRowProps) {
  return (
    <div className="flex flex-row gap-1 md:gap-2">
      {alliances.map((alliance) => (
        <div
          key={alliance}
          className="
            w-7 h-7 border-[#25be97] border rounded-full
            flex justify-center items-center
          "
          style={{ background: "radial-gradient(#25be97, #212121 80%)" }}
        >
          <img
            className="
              w-[60%] h-[60%]
              md:w-[65%] md:h-[65%]
            "
            src={getBondImage(alliance)}
          />
        </div>
      ))}
    </div>
  );
}

export default AllianceIconRow;
