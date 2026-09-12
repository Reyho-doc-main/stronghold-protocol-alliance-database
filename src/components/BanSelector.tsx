import type { AllianceDto } from "../dtos/alliance.dto";
import AllianceButton from "./AllianceButton";

const BANNED_COLOR = "#ef4444";

type BanSelectorProps = {
  coreAlliances: AllianceDto[];
  addonAlliances: AllianceDto[];
  bannedCore: string[];
  bannedAddon: string[];
  onToggleCoreBan: (alliance: string) => void;
  onToggleAddonBan: (alliance: string) => void;
  maxCoreBans?: number;
  maxAddonBans?: number;
};

function BanSelector({
  coreAlliances,
  addonAlliances,
  bannedCore,
  bannedAddon,
  onToggleCoreBan,
  onToggleAddonBan,
  maxCoreBans = 3,
  maxAddonBans = 4,
}: BanSelectorProps) {
  return (
    <div className="flex flex-col gap-3 border-2 border-[#ef4444] bg-[#2b1414] rounded-xl p-3 max-w-96 md:max-w-195">
      <div className="text-white text-sm">
        Select your bans: up to {maxCoreBans} Core Alliances and {maxAddonBans} Add-on Alliances.
      </div>

      <div className="flex flex-col gap-1">
        <div className="text-[#ef4444] text-xs">
          Core Alliances banned ({bannedCore.length}/{maxCoreBans})
        </div>
        <div className="flex flex-row flex-wrap gap-3 justify-center">
          {coreAlliances.map((alliance) => {
            const isActive = bannedCore.includes(alliance.name);
            const capReached = !isActive && bannedCore.length >= maxCoreBans;
            return (
              <AllianceButton
                key={alliance.bondId}
                allianceName={alliance.name}
                isActive={isActive}
                activeColor={BANNED_COLOR}
                onClick={() => {
                  if (capReached) return;
                  onToggleCoreBan(alliance.name);
                }}
              />
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <div className="text-[#ef4444] text-xs">
          Add-on Alliances banned ({bannedAddon.length}/{maxAddonBans})
        </div>
        <div className="flex flex-row flex-wrap gap-3 justify-center">
          {addonAlliances.map((alliance) => {
            const isActive = bannedAddon.includes(alliance.name);
            const capReached = !isActive && bannedAddon.length >= maxAddonBans;
            return (
              <AllianceButton
                key={alliance.bondId}
                allianceName={alliance.name}
                isActive={isActive}
                activeColor={BANNED_COLOR}
                onClick={() => {
                  if (capReached) return;
                  onToggleAddonBan(alliance.name);
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default BanSelector;
