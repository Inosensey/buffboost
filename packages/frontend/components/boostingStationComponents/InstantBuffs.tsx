"use client";

import BuffCard from "./BuffCard";

// types
interface props {
    buffList: Buff[];
    purchasedBuffsToday: Buff[];
    selectedBuffs: Buff[];
    handleSelectBuff: (buff: Buff) => void;
}


// Constants
const MAX_SELECTIONS = 3;
const InstantBuffs = ({ buffList, purchasedBuffsToday, selectedBuffs, handleSelectBuff }: props ) => {
  return (
    <div className="mt-2 py-1 overflow-hidden h-[85%] flex flex-wrap gap-3 justify-center">
      {buffList.map((buff: Buff) => (
        <BuffCard
          key={buff.id}
          isPurchased={
            purchasedBuffsToday.find(
              (purchasedBuff) => purchasedBuff.id === buff.id,
            )
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
          currentSelections={selectedBuffs.length + purchasedBuffsToday.length}
        />
      ))}
    </div>
  );
};

export default InstantBuffs;
