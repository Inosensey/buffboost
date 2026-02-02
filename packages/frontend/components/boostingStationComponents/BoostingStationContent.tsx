"use client";

import { useState } from "react";

// Components
import BuffCard from "./BuffCard";

// Constants
import { instantBuffs, dailyBlessings } from "@/constants/buffs";
const MAX_SELECTIONS = 3;
const headers: headerInterface = {
  instantBuffs: {
    title: "Instant Buffs (Daily)",
    description: "One-time boosts that last 24 hours",
  },
  dailyBlessings: {
    title: "Daily Blessings (Recurring)",
    description: "Recurring buffs delivered daily",
  },
};

const BoostingStationContent = () => {
  // States
  const [activeTab, setActiveTab] = useState("instantBuffs");
  const [buffList, setBuffList] = useState<BuffInterface[]>(instantBuffs);
  const [selectedBuffs, setSelectedBuffs] = useState<string[]>([]);

  // event functions
  const handleSelectBuff = (buffName: string) => {
    setSelectedBuffs((prev) => {
      if (prev.includes(buffName)) {
        return prev.filter((name) => name !== buffName);
      } else if (prev.length < MAX_SELECTIONS) {
        return [...prev, buffName];
      }
      return prev;
    });
  };

  return (
    <div className="flex justify-center items-center w-full">
      <div className="bg-black mt-2 rounded-lg p-2 phone:w-[95%] laptop:w-8/12">
        <div className="flex font-spaceGrotesk font-semibold h-[6.5%] phone:text-[0.75rem] mdphone:w-max mdphone:text-sm">
          <div
            onClick={() => {
              setActiveTab("instantBuffs");
              setBuffList(instantBuffs);
            }}
            className={`p-3 cursor-pointer ${activeTab === "instantBuffs" ? "bg-Foreground text-SoftBackground" : "bg-Background text-Text hover:bg-Foreground hover:text-SoftBackground"} transition duration-200`}
          >
            <p>Instant Buffs (Daily)</p>
          </div>
          <div
            onClick={() => {
              setActiveTab("dailyBlessings");
              setBuffList(dailyBlessings);
            }}
            className={`p-3 cursor-pointer ${activeTab === "dailyBlessings" ? "bg-Foreground text-SoftBackground" : "bg-Background text-Text hover:bg-Foreground hover:text-SoftBackground"} transition duration-200`}
          >
            <p>Daily Blessings (Recurring)</p>
          </div>
        </div>
        <div className="w-full h-[93%]">
          <div className="mt-4 flex flex-col gap-1 justify-center items-center h-[9%]">
            <p className="font-semibold font-spaceGrotesk text-SoftBackground phone:text-[0.95rem] mdphone:text-[1.1rem]">
              {headers[activeTab]?.title}
            </p>
            <p className="font-inter phone:text-[0.8rem] mdphone:text-sm">
              {headers[activeTab]?.description}
            </p>
          </div>
          <div className="mt-2 py-1 overflow-hidden h-[85%] flex flex-wrap gap-3 justify-center">
            {buffList.map((buff: BuffInterface) => (
              <BuffCard
                key={buff.name}
                buffInfo={buff}
                isSelected={selectedBuffs.includes(buff.name)}
                onSelect={handleSelectBuff}
                maxSelections={MAX_SELECTIONS}
                currentSelections={selectedBuffs.length}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoostingStationContent;
