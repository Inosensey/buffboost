"use client";

import { X } from "lucide-react";
import { AnimatePresence } from "motion/react";
import { useState } from "react";

// Components
import CancelPopUp from "./CancelPopUp";

// Types
interface props {
  key: string;
  buffInfo: Buff;
  stripeSubscriptionId: string;
}

const BuffTimelineCard = ({ buffInfo, stripeSubscriptionId }: props) => {
  // State
  const [toggleCancelPopup, setToggleCancelPopup] = useState(false);

  return (
    <>
      <div
        key={`${buffInfo.id}-${buffInfo.createdAt}-${Math.random() * 1000}`}
        className="p-3 rounded-lg group border border-Divider bg-Background/70 hover:bg-Background/90 transition-all hover:scale-[1.01]"
      >
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-2xl flex-shrink-0">{buffInfo.emoji}</span>
            <div className="min-w-0">
              <div className="flex items-center gap-1 flex-wrap">
                <span className="font-spaceGrotesk font-semibold text-Text text-sm">
                  {buffInfo.name}
                </span>
              </div>
              <p className="text-xs text-Text/60 truncate">
                {buffInfo.tagline}
              </p>
            </div>
            <button
              onClick={() => setToggleCancelPopup(true)}
              className="p-1 bg-red-500/10 rounded ml-3"
              title="Cancel subscription"
            >
              <X className="w-5 h-5 text-red-500" />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {toggleCancelPopup && (
          <CancelPopUp stripeSubscriptionId={stripeSubscriptionId} setToggleCancelPopup={setToggleCancelPopup} />
        )}
      </AnimatePresence>
    </>
  );
};

export default BuffTimelineCard;
