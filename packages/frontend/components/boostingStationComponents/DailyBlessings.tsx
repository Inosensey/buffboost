"use client"

import BuffCard from "./BuffCard";

// types
interface props {
    buffList: Buff[];
    currentActiveBuff: ActiveBuff | null;
    selectedBuffs: Buff[];
    handleSelectBuff: (buff: Buff) => void;
}

// Constants
const MAX_SELECTIONS = 1;

const DailyBlessings = ({ buffList, currentActiveBuff, selectedBuffs, handleSelectBuff }: props) => {
  return (
    <div className="mt-2 py-1 overflow-hidden h-[85%] flex flex-wrap gap-3 justify-center">
      {buffList.map((buff: Buff) => (
        <BuffCard
          key={buff.id}
          isPurchased={currentActiveBuff?.buff.id === buff.id 
              ? true
              : false
          }
          buffInfo={buff}
          isSelected={
            selectedBuffs.find((selectedBuff) => selectedBuff.id === buff.id)
              ? true
              : false
          }
          onSelect={handleSelectBuff}
          maxSelections={MAX_SELECTIONS}
          currentSelections={selectedBuffs.length + (currentActiveBuff ? 1 : 0)}
        />
      ))}
    </div>
  );
}

export default DailyBlessings
