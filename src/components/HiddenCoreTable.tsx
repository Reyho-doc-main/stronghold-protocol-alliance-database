import type { HiddenCoreRoundDto } from "../dtos/hiddenCore.dto";

type HiddenCoreTableProps = {
  rows: HiddenCoreRoundDto[];
};

function HiddenCoreTable({ rows }: HiddenCoreTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[600px] border-collapse text-sm text-white">
        <thead>
          <tr>
            <th className="bg-[#173b32] text-white text-center px-2 py-1.5 border border-[#25be97]">
              By the Number of Rounds
            </th>
            <th className="bg-[#173b32] text-white text-center px-2 py-1.5 border border-[#25be97]">
              Standard Simulation
            </th>
            <th className="bg-[#173b32] text-white text-center px-2 py-1.5 border border-[#25be97]">
              Perilous Simulation
            </th>
            <th className="bg-[#173b32] text-white text-center px-2 py-1.5 border border-[#25be97]">
              Dire Simulation
            </th>
            <th className="bg-[#173b32] text-white text-center px-2 py-1.5 border border-[#25be97]">
              Ultimate Simulation 
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.round}>
              <td className="text-center px-2 py-1 border border-[#3a3a3a] font-bold">{row.round}</td>
              <td className="text-center px-2 py-1 border border-[#3a3a3a]">{row.standard}</td>
              <td className="text-center px-2 py-1 border border-[#3a3a3a]">{row.Perilous_Simulation}</td>
              <td className="text-center px-2 py-1 border border-[#3a3a3a]">{row.Dire_Simulation}</td>
              <td className="text-center px-2 py-1 border border-[#3a3a3a]">{row.Ultimate_Simulation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HiddenCoreTable;
