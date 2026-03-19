"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Sparkles } from "lucide-react";

// utils
import { buffHelper } from "utils/nestJsEndPointHelper";
import { dateHelper } from "utils/generalHelper";

interface props {
  purchasedBuff: purchasedBuff[];
}

const BuffTimelines = ({ purchasedBuff }: props) => {
  const [expandedDates, setExpandedDates] = useState<Set<string>>(new Set());

  const arrangedBuffs = buffHelper.arrangedBuffsPurchasedByDate(purchasedBuff);

  const toggleDate = (date: string) => {
    const newExpanded = new Set(expandedDates);
    if (newExpanded.has(date)) {
      newExpanded.delete(date);
    } else {
      newExpanded.add(date);
    }
    setExpandedDates(newExpanded);
  };

  // Convert object to array with proper typing
  const timelineEntries: [string, Buff[]][] = Object.entries(arrangedBuffs);

  return (
    <div className="h-full flex flex-col bg-Background rounded-xl border border-Divider overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-Divider bg-Foreground/50">
        <div className="flex items-center justify-between">
          <h2 className="font-spaceGrotesk text-xl font-bold text-Text">
            Boost Chronicle 📜
          </h2>
          <span className="text-xs text-Text/40">
            {purchasedBuff.length} total buffs
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-3">
        {timelineEntries.map(([date, buffs]) => (
          <div
            key={date}
            className="bg-Foreground rounded-lg border border-Divider overflow-hidden"
          >
            <button
              onClick={() => toggleDate(date)}
              className="w-full px-4 py-3 flex items-center justify-between bg-Background/70 hover:bg-Background/90 transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="font-spaceGrotesk font-semibold text-Text">
                  {dateHelper.formatLongDate(date)}
                </span>
                <span className="text-xs text-Text/60 font-semibold">({buffs.length})</span>
              </div>
              {expandedDates.has(date) ? (
                <ChevronUp className="w-4 h-4 text-Text/40" />
              ) : (
                <ChevronDown className="w-4 h-4 text-Text/40" />
              )}
            </button>

            {expandedDates.has(date) && (
              <div className="p-3 space-y-2">
                {buffs.map((buff) => {
                  const purchasedData = purchasedBuff.find(
                    (pb) => pb.buffId === buff.id,
                  );
                  return (
                    <div
                      key={`${buff.id}-${date}-${Math.random() * 1000}`}
                      className="p-3 rounded-lg border border-Divider bg-Background/70 hover:bg-Background/90 transition-all hover:scale-[1.01]"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-start gap-2 min-w-0">
                          <span className="text-2xl flex-shrink-0">
                            {buff.emoji}
                          </span>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1 flex-wrap">
                              <span className="font-spaceGrotesk font-semibold text-Text text-sm">
                                {buff.name}
                              </span>
                            </div>
                            <p className="text-xs text-Text/60 truncate">
                              {buff.tagline}
                            </p>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="font-spaceGrotesk font-bold text-Success text-sm">
                            ${buff.price.toFixed(2)}
                          </div>
                          {purchasedData?.endDate && (
                            <div className="text-[0.7rem] text-Text/40">
                              Expires:{" "}
                              {new Date(
                                purchasedData.endDate,
                              ).toLocaleDateString()}
                            </div>
                          )}
                        </div>
                      </div>

                      {buff.isRecurring && purchasedData?.nextDeliveryAt && (
                        <div className="mt-2 pt-2 border-t border-Divider/50 flex items-center gap-1 text-[0.7rem] text-Text/40">
                          <Sparkles className="w-3 h-3" />
                          Next:{" "}
                          {new Date(
                            purchasedData.nextDeliveryAt,
                          ).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}

        {timelineEntries.length === 0 && (
          <div className="text-center py-8">
            <div className="text-4xl mb-2">📭</div>
            <p className="font-inter text-Text/40 text-sm">
              No buffs found in your chronicle
            </p>
            <p className="text-xs text-Text/20 mt-1">
              Head to the Boosting Station to start your journey!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuffTimelines;
