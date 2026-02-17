"use client";

import Link from "next/link";
import StreamlineLogosFacebookGamingLogoBlock from "@/icons/StreamlineLogosFacebookGamingLogoBlock";
import MakiFireStation11 from "@/icons/MakiFireStation11";
import LucideBicepsFlexed from "@/icons/LucideBicepsFlexed";
import SolarLogoutOutline from "@/icons/SolarLogoutOutline";

const Nav = () => {
  return (
    <nav className="phone:hidden mdphone:flex fixed left-1/2 z-10 flex items-center justify-between h-12 -translate-x-2/4 w-full px-2 font-roboto backdrop-blur-sm bg-black/20 border-b border-Divider shadow-[0_2px_12px_rgba(60,9,108,0.35)] mdphone:text-[0.8rem] mdtablet:text-base">
      <div className="flex items-center justify-center gap-2">
        <Link className="flex items-center gap-1 text-Text" href="/">
          <p className="font-oxanium cursor-pointer font-bold">
            Buff Boost
          </p>
          <StreamlineLogosFacebookGamingLogoBlock
            color="#5A189A"
            width="1.1em"
            height="1.1em"
          />
        </Link>
      </div>
      <div className="flex flex-row items-center gap-2">
        <Link className="flex items-center gap-1 text-Text hover:underline" href="/boosting-station">
          <p className="font-oxanium cursor-pointer font-bold">
            Boosting Station
          </p>
          <MakiFireStation11
            color="#5A189A"
            width="1.1em"
            height="1.1em"
          />
        </Link>
        <Link className="flex items-center gap-1 text-Text hover:underline" href="/my-buffs">
          <p className="font-oxanium cursor-pointer font-bold">
            My Buffs
          </p>
          <LucideBicepsFlexed
            color="#5A189A"
            width="1.1em"
            height="1.1em"
          />
        </Link>
      </div>
      <div className="flex items-center justify-center text-Text hover:underline gap-2">
        <Link className="flex items-center gap-1" href="/">
          <p className="font-oxanium cursor-pointer font-bold">
            Sign Out
          </p>
          <SolarLogoutOutline
            color="#5A189A"
            width="1.1em"
            height="1.1em"
          />
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
