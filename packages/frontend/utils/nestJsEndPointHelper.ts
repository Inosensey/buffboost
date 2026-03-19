export const buffHelper = {
  arrangeBuffByType: (buffs: Buff[]): Record<BuffType, Buff[]> => {
    const arrangedBuffs: Record<BuffType, Buff[]> = {
      ["instantBuffs"]: [],
      ["dailyBlessings"]: [],
    };
    buffs.forEach((buff) => {
      arrangedBuffs[buff.type].push(buff);
    });
    return arrangedBuffs;
  },
  extractBuffsFromPurchasedBuffs: (purchasedBuffs: purchasedBuff[]): Buff[] => {
    return purchasedBuffs.map((purchasedBuff) => purchasedBuff.buff);
  },
  arrangedBuffsPurchasedByDate: (purchasedBuffs: purchasedBuff[]): Record<string, Buff[]> => {
    const arrangedBuffs: Record<string, Buff[]> = {};
    purchasedBuffs.forEach((purchasedBuff) => {
      const dateKey = new Date(purchasedBuff.startDate).toLocaleDateString();
      if (!arrangedBuffs[dateKey]) {
        arrangedBuffs[dateKey] = [];
      }
      arrangedBuffs[dateKey].push(purchasedBuff.buff);
    });
    const sorted = Object.fromEntries(
      Object.entries(arrangedBuffs).sort(([dateA], [dateB]) => {
        return new Date(dateA).getTime() - new Date(dateB).getTime();
      })
    );
    return sorted;
  }
};
