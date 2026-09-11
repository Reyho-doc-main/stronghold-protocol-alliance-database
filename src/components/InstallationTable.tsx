import React from "react";
import type { MapInstallationDto } from "../dtos/map.dto";
import RangeIndicator from "./RangeIndicator";

type InstallationTableProps = {
  installation: MapInstallationDto;
};

function InstallationTable({ installation }: InstallationTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[500px] border-collapse text-sm text-white">
        <tbody>
          <tr>
            <th
              rowSpan={2}
              className="bg-[#1c6b57] text-center px-2 py-1.5 border border-[#25be97] w-20"
            >
              Lv.{installation.level}
            </th>
            <td colSpan={4} className="text-center px-2 py-1.5 border border-[#25be97] font-bold">
              {installation.name}
            </td>
          </tr>
          {installation.faction && (
            <tr>
              <td colSpan={4} className="text-center px-2 py-1.5 border border-[#25be97]">
                {installation.faction}
              </td>
            </tr>
          )}

          <tr>
            <th className="bg-[#173b32] text-center px-2 py-1.5 border border-[#25be97]">Hit points</th>
            <th className="bg-[#173b32] text-center px-2 py-1.5 border border-[#25be97]">Attack power</th>
            <th className="bg-[#173b32] text-center px-2 py-1.5 border border-[#25be97]">Defense</th>
            <th className="bg-[#173b32] text-center px-2 py-1.5 border border-[#25be97]">Spell resistance</th>
            <th className="bg-[#173b32] text-center px-2 py-1.5 border border-[#25be97]">Number of blocks</th>
          </tr>
          <tr>
            <td className="text-center px-2 py-1 border border-[#3a3a3a]">{installation.hp}</td>
            <td className="text-center px-2 py-1 border border-[#3a3a3a]">{installation.attackPower}</td>
            <td className="text-center px-2 py-1 border border-[#3a3a3a]">{installation.defense}</td>
            <td className="text-center px-2 py-1 border border-[#3a3a3a]">{installation.spellResistance}</td>
            <td className="text-center px-2 py-1 border border-[#3a3a3a]">{installation.blockCount}</td>
          </tr>

          {installation.attackRange && (
            <>
              <tr>
                <th colSpan={5} className="bg-[#173b32] text-center px-2 py-1.5 border border-[#25be97]">
                  Attack range
                </th>
              </tr>
              <tr>
                <td colSpan={5} className="text-center px-2 py-2 border border-[#3a3a3a]">
                  <div className="flex justify-center">
                    <RangeIndicator cells={installation.attackRange} />
                  </div>
                </td>
              </tr>
            </>
          )}

          <tr>
            <th colSpan={5} className="bg-[#173b32] text-center px-2 py-1.5 border border-[#25be97]">
              Skills
            </th>
          </tr>
          {installation.skills.map((skill) => (
            <React.Fragment key={skill.name}>
              <tr>
                <td colSpan={2} className="px-2 py-1.5 border border-[#3a3a3a] font-bold">
                  {skill.name}
                </td>
                <td colSpan={3} className="px-2 py-1.5 border border-[#3a3a3a]">
                  <span className="px-2 py-0.5 rounded-sm bg-[#8a8a8a] text-white text-xs">
                    {skill.type}
                  </span>
                </td>
              </tr>
              <tr>
                <td colSpan={5} className="px-3 py-2 border border-[#3a3a3a] text-left whitespace-pre-wrap">
                  <div>{skill.description}</div>
                  {skill.bullets && skill.bullets.length > 0 && (
                    <ul className="list-disc pl-5 flex flex-col gap-1 mt-2">
                      {skill.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                </td>
              </tr>
            </React.Fragment>
          ))}

          {installation.note && (
            <>
              <tr>
                <th colSpan={5} className="bg-[#173b32] text-center px-2 py-1.5 border border-[#25be97]">
                  Note
                </th>
              </tr>
              <tr>
                <td colSpan={5} className="px-3 py-2 border border-[#3a3a3a] text-left text-[#bbbbbb] text-xs italic">
                  {installation.note}
                </td>
              </tr>
            </>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default InstallationTable;
