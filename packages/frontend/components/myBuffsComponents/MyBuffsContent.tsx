"use client";

import { useState } from "react";

// Components
import BuffTimelines from "./BuffTimelines";
import ActiveBuffs from "./ActiveBuffs";

// utils
import { buffHelper } from "utils/nestJsEndPointHelper";

// Types
interface props {
  todayBuffs: purchasedBuff[];
  historyBuffs: purchasedBuff[];
}

// Constants
const headers: headerInterface = {
  activeBuffs: {
    title: "Active Buffs",
    description:
      "⚡ Currently equipped power-ups | Monitor timers and boost effectiveness",
  },
  buffTimeline: {
    title: "Boost Chronicle",
    description:
      "📜 Your epic buff journey timeline | Relive purchases, and deliveries",
  },
};

const MyBuffsContent = ({ todayBuffs, historyBuffs }: props) => {
  // States
  const [buffList, setBuffList] = useState<purchasedBuff[]>(todayBuffs);
  const [activeTab, setActiveTab] = useState("activeBuffs");

  return (
    <div className="flex justify-center items-center w-full">
      <div className="bg-black mt-2 rounded-lg p-2 mdtablet:h-[660px] phone:w-[95%] laptop:w-8/12">
        <div className="flex font-spaceGrotesk font-semibold text-sm h-[6.5%] phone:text-[0.75rem] mdphone:w-max mdphone:text-sm">
          <div
            onClick={() => {
              setActiveTab("activeBuffs");
              setBuffList(todayBuffs);
            }}
            className={`p-3 cursor-pointer ${activeTab === "activeBuffs" ? "bg-Foreground text-SoftBackground" : "bg-Background text-Text hover:bg-Foreground hover:text-SoftBackground"} transition duration-200`}
          >
            <p>Active Buffs</p>
          </div>
          <div
            onClick={() => {
              setActiveTab("buffTimeline");
              setBuffList(historyBuffs);
            }}
            className={`p-3 cursor-pointer ${activeTab === "buffTimeline" ? "bg-Foreground text-SoftBackground" : "bg-Background text-Text hover:bg-Foreground hover:text-SoftBackground"} transition duration-200`}
          >
            <p>Buff Timeline</p>
          </div>
        </div>
        <div className="w-full h-[93%]">
          <div className="mt-4 flex flex-col gap-1 justify-center items-center h-[9%]">
            <p className="font-semibold font-spaceGrotesk text-SoftBackground phone:text-[0.95rem] mdphone:text-[1.1rem]">
              {headers[activeTab]?.title}
            </p>
            <p className="font-inter text-center phone:text-[0.8rem] mdphone:text-sm">
              {headers[activeTab]?.description}
            </p>
          </div>
          <div className="mt-2 py-1 h-[85%]">
            {activeTab === "activeBuffs" ? (
              <ActiveBuffs todayBuffs={buffList} />
            ) : (
              <BuffTimelines purchasedBuff={buffList} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBuffsContent;
