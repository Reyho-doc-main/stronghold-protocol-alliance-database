import type { OperatorDto } from "../dtos/operator.dto";
import type { AllianceDto } from "../dtos/alliance.dto";
import { getAlliancesBySeason, getOperatorsBySeason } from "../utils/getDataBySeason";
import AllianceCard from "../components/AllianceCard";

type AllianceListProps = {
  season: string;
};

const AllianceList = ({ season }: AllianceListProps) => {
  const allianceData: AllianceDto[] = getAlliancesBySeason(season);
  const operatorData: OperatorDto[] = getOperatorsBySeason(season);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 mx-6 mb-6 gap-6">
      {allianceData.map((alliance) => {
        const ops = operatorData.filter((op) =>
          op.alliances.includes(alliance.name.replaceAll(" ", "_")),
        );
        return <AllianceCard key={alliance.bondId} alliance={alliance} operators={ops} />;
      })}
    </div>
  );
};

export default AllianceList;
