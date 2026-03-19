"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";

// Components
import Checkout from "../reusableComponents/Checkout";
import InstantBuffs from "./InstantBuffs";
import DailyBlessings from "./DailyBlessings";

// types
interface props {
  buffs: Record<BuffType, Buff[]>;
  purchasedBuffsToday: Buff[];
  currentActiveBuff: ActiveBuff | null;
}

// Constants
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

const BoostingStationContent = ({
  buffs,
  purchasedBuffsToday,
  currentActiveBuff,
}: props) => {
  // States
  const [activeTab, setActiveTab] = useState<BuffType>("instantBuffs");
  const [buffList, setBuffList] = useState<Buff[]>(buffs.instantBuffs);
  const [selectedBuffs, setSelectedBuffs] = useState<Buff[]>([]);
  const [toggleCheckout, setToggleCheckout] = useState<boolean>(false);
  const [totalCost, setTotalCost] = useState<number>(0);

  // event functions
  const handleSelectBuffs = (buff: Buff) => {
    if (selectedBuffs.length === 0) {
      setSelectedBuffs((prev) => [...prev, buff]);
      return;
    } else {
      const isAlreadySelected = selectedBuffs.find(
        (selectedBuff) => selectedBuff.id === buff.id,
      );
      if (isAlreadySelected) {
        setSelectedBuffs((prev) =>
          prev.filter((selectedBuff) => selectedBuff.id !== buff.id),
        );
      } else {
        setSelectedBuffs((prev) => [...prev, buff]);
      }
    }
  };

  // useEffect
  useEffect(() => {
    let totalPrice = 0;
    if (selectedBuffs.length === 0) {
      setTotalCost(0);
      return;
    }
    selectedBuffs.forEach((buff) => {
      totalPrice += buff.price!;
    });
    setTotalCost(totalPrice);
  }, [selectedBuffs]);

  return (
    <>
      <div className="flex justify-center items-center w-full">
        <div className="bg-black mt-2 rounded-lg p-2 phone:w-[95%] laptop:w-8/12">
          <div className="flex font-spaceGrotesk font-semibold h-[6.5%] phone:text-[0.75rem] mdphone:w-max mdphone:text-sm">
            <div
              onClick={() => {
                setActiveTab("instantBuffs");
                setBuffList(buffs.instantBuffs);
              }}
              className={`p-3 cursor-pointer ${activeTab === "instantBuffs" ? "bg-Foreground text-SoftBackground" : "bg-Background text-Text hover:bg-Foreground hover:text-SoftBackground"} transition duration-200`}
            >
              <p>Instant Buffs (Daily)</p>
            </div>
            <div
              onClick={() => {
                setActiveTab("dailyBlessings");
                setBuffList(buffs.dailyBlessings);
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
            {selectedBuffs.length > 0 && (
              <div className="bg-Foreground border-t border-Divider p-2 my-4 rounded-lg w-[92%] mx-auto">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                  <div>
                    <p className="font-inter text-Text/80">
                      {selectedBuffs.length} buff
                      {selectedBuffs.length > 1 ? "s" : ""} selected
                    </p>
                    <p className="font-spaceGrotesk text-xl font-bold text-Text">
                      ${totalCost.toFixed(2)}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setToggleCheckout(true);
                    }}
                    className="py-3 px-8 bg-Success hover:bg-SuccessDark text-white font-inter font-medium rounded-lg transition-colors"
                  >
                    Checkout Now
                  </button>
                </div>
              </div>
            )}
            {activeTab === "instantBuffs" && (
              <InstantBuffs
                buffList={buffList}
                purchasedBuffsToday={purchasedBuffsToday}
                selectedBuffs={selectedBuffs}
                handleSelectBuff={handleSelectBuffs}
              />
            )}
            {activeTab === "dailyBlessings" && (
              <DailyBlessings
                buffList={buffList}
                currentActiveBuff={currentActiveBuff}
                selectedBuffs={selectedBuffs}
                handleSelectBuff={handleSelectBuffs}
              />
            )}
          </div>
        </div>
      </div>
      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {toggleCheckout && (
          <Checkout
            selectedBuffs={selectedBuffs}
            setToggleCheckout={setToggleCheckout}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default BoostingStationContent;
