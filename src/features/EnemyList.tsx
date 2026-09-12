import { useState } from "react";
import LeaderCard from "../components/LeaderCard";
import TacticalTrainingCard from "../components/TacticalTrainingCard";
import DecisionCategoryButton from "../components/DecisionCategoryButton";
import DecisionCard from "../components/DecisionCard";
import CollapsibleSection from "../components/CollapsibleSection";
import CalculationTable from "../components/CalculationTable";
import TrophyCard from "../components/TrophyCard";
import HiddenCoreTable from "../components/HiddenCoreTable";
import MapCard from "../components/MapCard";
import DispatchModuleSection from "../components/DispatchModuleSection";
import {
  getLeadersBySeason,
  getTacticalTrainingBySeason,
  getBountyDecisionsBySeason,
  getTacticalDecisionsBySeason,
  getAdvancedCalculationsBySeason,
  getTrophiesBySeason,
  getHiddenCoreBySeason,
  getMapsBySeason,
  getDispatchModuleBySeason
} from "../utils/getDataBySeason";
import { isRateLimited } from "../utils/rateLimit";

type EnemyListProps = {
  season: string;
};

type DecisionCategory = "bounty" | "tactical";

const EnemyList = ({ season }: EnemyListProps) => {
  const [trainingId, setTrainingId] = useState<string | null>(null);
  const [decisionCategory, setDecisionCategory] = useState<DecisionCategory | null>(null);

  const leaders = getLeadersBySeason(season);
  const tacticalTraining = getTacticalTrainingBySeason(season);
  const bountyDecisions = getBountyDecisionsBySeason(season);
  const tacticalDecisions = getTacticalDecisionsBySeason(season);
  const advancedCalculations = getAdvancedCalculationsBySeason(season);
  const trophies = getTrophiesBySeason(season);
  const hiddenCore = getHiddenCoreBySeason(season);
  const maps = getMapsBySeason(season);
  const dispatchModule = getDispatchModuleBySeason(season);

  const openTraining = (id: string) => setTrainingId(id);

  const closeTraining = () => setTrainingId(null);

  const openDecisions = (category: DecisionCategory) => setDecisionCategory(category);

  const closeDecisions = () => setDecisionCategory(null);

  const navigateToTerraWiki = (wikiLink: string) => {
    if (isRateLimited("wiki-link", 500)) return;
    window.open(wikiLink, "_blank");
  };

  const activeTraining = tacticalTraining.find((training) => training.id === trainingId);

  if (activeTraining) {
    return (
      <div className="flex flex-col mx-6 mb-6 gap-3">
        <button className="text-white text-left w-fit cursor-pointer" onClick={closeTraining}>
          {"< Back"}
        </button>
        <div className="text-2xl text-white">{activeTraining.name}</div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(90px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(120px,1fr))] lg:grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-3">
          {activeTraining.enemies.map((enemy) => (
            <button
              key={enemy.name}
              onClick={() => navigateToTerraWiki(enemy.wikiLink)}
              className="flex flex-col w-full border-2 border-[#25be97] overflow-hidden cursor-pointer hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="w-full aspect-square overflow-hidden">
                <img src={`/enemyicons/${enemy.image}`} className="w-full h-full object-cover" />
              </div>
              <div className="w-full bg-[#212121] text-white text-[11px] md:text-[13px] py-1 px-1 text-center truncate">
                {enemy.name}
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (decisionCategory) {
    const decisions = decisionCategory === "bounty" ? bountyDecisions : tacticalDecisions;
    const title = decisionCategory === "bounty" ? "Bounty Decisions" : "Tactical Decisions";

    return (
      <div className="flex flex-col mx-6 mb-6 gap-3">
        <button className="text-white text-left w-fit cursor-pointer" onClick={closeDecisions}>
          {"< Back"}
        </button>
        <div className="text-2xl text-white">{title}</div>
        <div className="flex flex-col gap-3">
          {decisions.length === 0 && <div className="text-[#888888] text-sm">No decisions added yet.</div>}
          {decisions.map((decision, index) => (
            <DecisionCard key={`${decision.name}-${index}`} decision={decision} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col mx-6 mb-6 gap-6">
      <div>
        <div className="text-2xl text-white mb-3">Leaders</div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {leaders.map((leader) => (
            <LeaderCard key={leader.name} leader={leader} />
          ))}
        </div>
      </div>
      <div>
        <div className="text-2xl text-white mb-3">Tactical Training Enemies</div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {tacticalTraining.map((training) => (
            <TacticalTrainingCard key={training.id} training={training} onOpen={openTraining} />
          ))}
        </div>
      </div>
      <div>
        <div className="text-2xl text-white mb-3">Decisions</div>
        <div className="flex flex-col gap-4">
          <DecisionCategoryButton title="Bounty Decisions" onOpen={() => openDecisions("bounty")} />
          <DecisionCategoryButton title="Tactical Decisions" onOpen={() => openDecisions("tactical")} />
        </div>
      </div>
      <CollapsibleSection
        title="Maps"
        note="The game does not provide the original map assets — screenshots are for reference only."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {maps.map((map) => (
            <MapCard key={map.id} map={map} />
          ))}
        </div>
      </CollapsibleSection>
      <CollapsibleSection title="Advanced Calculations" note="All data is taken from prts.wiki.">
        <div className="flex flex-col gap-4">
          <div className="text-lg text-white font-bold">Enemy Stat Scaling Information</div>
          <div className="flex flex-col gap-8">
            <CalculationTable title="Attack power bonus" data={advancedCalculations.attackPowerBonus} />
            <CalculationTable title="Health bonus" data={advancedCalculations.healthBonus} />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="text-lg text-white font-bold">Trophies Information</div>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
            {trophies.map((trophy) => (
              <TrophyCard key={trophy.range} range={trophy.range} image={trophy.image} />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="text-lg text-white font-bold">Hidden Core Reach Condition</div>
          <HiddenCoreTable rows={hiddenCore} />
          <div className="flex items-start gap-2 border border-[#c9a227] bg-[#3d3410] text-[#e8c468] text-xs px-3 py-2">
            <span className="shrink-0">🛈</span>
            <span>
              The trigger conditions for Hidden Core are provided by the community, and accuracy is not guaranteed.
            </span>
          </div>
          <div className="text-[#bbbbbb] text-sm flex flex-col gap-2">
            <div>
              In Perilous Simulation and higher difficulty, if certain conditions are met after passing turn 14 (final
              leader enemy), Hidden Core is unlocked (the details for unlocking is as follows):
            </div>
            <ul className="list-disc pl-5 flex flex-col gap-1">
              <li>In standalone simulation: Activated Alliance total stacks &gt; 350 and remaining HP &gt; 1 (In season 1, total alliance stack only needs to be 300)</li>
              <li>
                Alliance simulation: All players have a total of &gt;1200 active covenant stacks and have &gt; 1
                remaining HP (In season 1, total alliance stack only needs to be 1000)
              </li>
            </ul>
            <div>
              The enemies in the Secret Core are all Originium Creations, and failing to pass the Secret Core will not affect your clear status (still considered a simulation clearance) or the reward amount for garrison certifications (It will affect trophy gain though). If successful, a special completion prompt will appear and be displayed on the checkout screen.
            </div>
          </div>
        </div>
      </CollapsibleSection>
      {dispatchModule && (
        <CollapsibleSection
          title="Dispatch Module Usage"
          note="Sky's recommendation list (Slightly edited)"
        >
          <DispatchModuleSection data={dispatchModule} />
        </CollapsibleSection>
      )}
    </div>
  );
};

export default EnemyList;