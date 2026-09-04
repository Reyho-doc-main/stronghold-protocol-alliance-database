import type { CalculationRoundDto, CalculationSimulationDto } from "../dtos/calculation.dto";

type CalculationTableProps = {
  title: string;
  data: CalculationSimulationDto;
};

function SimulationRows({ label, rows }: { label: string; rows: CalculationRoundDto[] }) {
  return (
    <>
      <tr>
        <th className="bg-[#1f4f43] text-white text-left px-2 py-1.5 border border-[#25be97]">{label}</th>
        <th colSpan={4} className="bg-[#1f4f43] text-white text-center px-2 py-1.5 border border-[#25be97]">
          Difficulty
        </th>
      </tr>
      <tr>
        <th className="bg-[#173b32] text-white text-center px-2 py-1.5 border border-[#25be97]">Round</th>
        <th className="bg-[#173b32] text-white text-center px-2 py-1.5 border border-[#25be97]">Standard Simulation</th>
        <th className="bg-[#173b32] text-white text-center px-2 py-1.5 border border-[#25be97]">Perilous Simulation</th>
        <th className="bg-[#173b32] text-white text-center px-2 py-1.5 border border-[#25be97]">Dire Simulation</th>
        <th className="bg-[#173b32] text-white text-center px-2 py-1.5 border border-[#25be97]">Ultimate Simulation</th>
      </tr>
      {rows.map((row) => (
        <tr key={row.round}>
          <td className="text-center px-2 py-1 border border-[#3a3a3a]">{row.round}</td>
          <td className="text-center px-2 py-1 border border-[#3a3a3a]">{row.standard}</td>
          <td className="text-center px-2 py-1 border border-[#3a3a3a]">{row.aPerilousSituation}</td>
          <td className="text-center px-2 py-1 border border-[#3a3a3a]">{row.desperateSituation}</td>
          <td className="text-center px-2 py-1 border border-[#3a3a3a]">{row.Ultimate_Simulation}</td>
        </tr>
      ))}
    </>
  );
}

function CalculationTable({ title, data }: CalculationTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[600px] border-collapse text-sm text-white">
        <thead>
          <tr>
            <th colSpan={5} className="bg-[#1c6b57] text-center px-2 py-2 border border-[#25be97]">
              {title}
            </th>
          </tr>
        </thead>
        <tbody>
          <SimulationRows label="Solo simulation" rows={data.soloSimulation} />
            <tr>
            <td colSpan={5} className="h-4 border-none bg-[#2b2b2b]" />
          </tr>
          <SimulationRows label="Alliance simulation" rows={data.allianceSimulation} />
        </tbody>
      </table>
    </div>
  );
}

export default CalculationTable;
