"use client";

import { useState } from "react";

// Components
import ActiveBuffCard from "./ActiveBuffCard";
import BuffTimelineCard from "./BuffTimelineCard";

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
const activeBuffs: BuffInterface[] = [
  {
    name: "Patience",
    emoji: "🧘",
    type: "instantBuffs",
    description: "Stay calm under pressure",
    tagline: "Zen mode activated",
  },
  {
    name: "Strength",
    emoji: "💪",
    type: "instantBuffs",
    price: 29.99,
    description: "Feel physically and mentally empowered",
    tagline: "Unlock your inner powerhouse",
  },
  {
    name: "Courage",
    emoji: "🦁",
    type: "instantBuffs",
    description: "Face fears with bravery",
    tagline: "Brave heart activated",
  },
  {
    name: "Luck",
    type: "dailyBlessings",
    emoji: "🍀",
    description: "Attract good fortune",
    tagline: "Fortune favors the boosted",
  },
];
const buffTimeline: BuffInterface[] = [
  {
    name: "Wisdom",
    emoji: "🦉",
    type: "instantBuffs",
    price: 29.99,
    description: "Make smarter decisions",
    tagline: "Ancient knowledge unlocked",
  },
  {
    name: "Charisma",
    emoji: "😎",
    type: "instantBuffs",
    price: 29.99,
    description: "Shine in social situations",
    tagline: "Magnetic personality engaged",
  },
  {
    name: "Focus",
    emoji: "🎯",
    type: "instantBuffs",
    price: 29.99,
    description: "Concentrate deeply on tasks",
    tagline: "Laser precision mode",
  },
  {
    name: "Gratitude",
    type: "dailyBlessings",
    emoji: "🙏",
    price: 29.99,
    description: "Appreciate life's blessings",
    tagline: "Thankfulness amplified",
  },
];

const MyBuffsContent = () => {
  // States
  const [activeTab, setActiveTab] = useState("activeBuffs");
  const [buffList, setBuffList] = useState<BuffInterface[]>(activeBuffs);

  return (
    <div className="flex justify-center items-center w-full">
      <div className="bg-black mt-2 rounded-lg p-2 mdtablet:h-[660px] phone:w-[95%] laptop:w-8/12">
        <div className="flex font-spaceGrotesk font-semibold text-sm h-[6.5%] phone:text-[0.75rem] mdphone:w-max mdphone:text-sm">
          <div
            onClick={() => {
              setActiveTab("activeBuffs");
              setBuffList(activeBuffs);
            }}
            className={`p-3 cursor-pointer ${activeTab === "activeBuffs" ? "bg-Foreground text-SoftBackground" : "bg-Background text-Text hover:bg-Foreground hover:text-SoftBackground"} transition duration-200`}
          >
            <p>Active Buffs</p>
          </div>
          <div
            onClick={() => {
              setActiveTab("buffTimeline");
              setBuffList(buffTimeline);
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
          <div className="mt-2 py-1 max-h-[85%] flex flex-wrap gap-3 phone:justify-center desktop:justify-start">
            {buffList.map((buff: BuffInterface) =>
              activeTab === "activeBuffs" ? (
                <ActiveBuffCard key={buff.name} buffInfo={buff} />
              ) : (
                <BuffTimelineCard key={buff.name} buffInfo={buff} />
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBuffsContent;
