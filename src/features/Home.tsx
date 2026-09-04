import {FaGithub} from "react-icons/fa";

export default function Home() {
  return (
    <div className="px-10 flex flex-col items-center text-center gap-5 text-white">
      <div className="w-[15vw] h-[15vw] min-w-37.5 min-h-37.5">
        <img src="/kelsey.png" className="w-[15vw] min-w-37.5" />
      </div>
      <div className="text-xl md:text-3xl">Welcome to Stronghold Protocol Database</div>
      <div className="text-lg md:text-xl">
        This page is dedicated to documenting relevant data regarding the Stronghold Protocol
        Alliance seasons for the EN community. CN content are tentatively translated and may not
        reflect the official translations.
      </div>
      <div className="text-lg md:text-xl">
        Great thanks to PRTS and AK Terra Wiki for their work and supports, and thanks to all my friends on Discord (especially margaretnearl) who provided some of the important information free of charge seen on this website, really appreciate you guys
      </div>
      <div className="text-lg md:text-xl">
        If any issue arises (i.e. bugs, incorrect data, typo, etc), please contact me using methods
        below:
      </div>
      <div className="flex flex-row text-2xl md:text-3xl w-full gap-10 items-center justify-center">
        <div
          onClick={() =>
            window.open("https://github.com/Reyho-doc-main/stronghold-protocol-alliance-database")
          }
          className="cursor-pointer"
        >
          <FaGithub />
        </div>
      </div>
      <div className="text-lg md:text-xl">
        What's new:
        <ul>
          <li>* Added a bunch of new information, such as bosses, tactical decisions etc. Some are not done and finished.</li>
          <li>* Corrected some typos, added new ways to search (which will hopefully make things better). Still have to download a lot of stuff and add a lot of CN stuff to database, will be done at a later time. Bounty decisions are currently pretty inaccurate, expect lots of bugs there.</li>
        </ul>
      </div>
    </div>
  );
}
