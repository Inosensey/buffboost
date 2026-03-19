"use client";

// Components
import ActiveBuffCard from "./ActiveBuffCard";

// Icons
import { Package } from "lucide-react";

interface props {
  todayBuffs: purchasedBuff[];
}

const ActiveBuffs = ({ todayBuffs }: props) => {
  return (
    <div className="h-full flex flex-col">
      {todayBuffs.length > 0 ? (
        <div className="flex flex-wrap gap-3 phone:justify-center desktop:justify-start overflow-auto">
          {todayBuffs.map((purchasedBuff: purchasedBuff) => (
            <ActiveBuffCard
              key={purchasedBuff.id}
              buffInfo={purchasedBuff.buff}
            />
          ))}
        </div>
      ) : (
        <div className="h-full flex flex-col items-center justify-center text-center p-8">
          <div className="w-20 h-20 bg-Foreground rounded-full flex items-center justify-center mb-4 border border-Divider">
            <Package className="w-10 h-10 text-Text/30" />
          </div>
          <h3 className="font-spaceGrotesk text-xl font-bold text-Text/90 mb-2">
            No Active Boosts Today
          </h3>
          <p className="font-inter text-sm text-Text/70 max-w-xs">
            Your chronicle is waiting to be written! Head to the Boosting Station to power up your day.
          </p>
        </div>
      )}
    </div>
  );
};

export default ActiveBuffs;