import {FaGithub} from "react-icons/fa";

export default function Home() {
  return (
    <div className="px-10 flex flex-col items-center text-center gap-5 text-white">
      <div className="w-[15vw] h-[15vw] min-w-37.5 min-h-37.5">
        <img src="/kelsey.png" className="w-[15vw] min-w-37.5" />
      </div>
      <div className="text-xl md:text-3xl">Welcome to Stronghold Protocol Alliance Database</div>
      <div className="text-lg md:text-xl">
        This page is dedicated to documenting relevant data regarding the Stronghold Protocol
        Alliance seasons for the EN community. CN content are tentatively translated and may not
        reflect the official translations.
      </div>
      <div className="text-lg md:text-xl">
        Great thanks to PRTS and AK Terra Wiki for their work and supports, and thanks to all my friends on Discord (especially margaretnearl) who provided some of the important information free of charge seen on this website, really appreciate you guys. Some information may be inaccurate.
      </div>
      <div className="text-lg md:text-xl">
        If any issue arises (i.e. bugs, incorrect data, typo, etc), please contact me using github:
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
          <li>* Added a new way to filter through bans (there is a checkbox to not reveal banned ops if you prefer).</li>
          <li>* Corrected some typos, added new ways to search (which will hopefully make things better). Still have to download a lot of stuff and add a lot of CN stuff to database, will be done at a later time.</li>
        </ul>
      </div>
    </div>
  );
}
