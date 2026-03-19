"use client";

import Link from "next/link";
import {
  CheckCircle,
  Home,
  ShoppingBag,
  Sparkles,
  Calendar,
  Clock,
  Repeat,
} from "lucide-react";
import { dateHelper } from "utils/generalHelper";

interface props {
  activeBuff: ActiveBuff | null;
}

export default function SuccessPaymentContent({ activeBuff }: props) {
  return (
    <div className="min-h-screen bg-[#10002B] py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-[#10B981]/20 blur-2xl rounded-full"></div>
            <div className="relative w-16 h-16 mx-auto mb-3 rounded-full bg-[#10B981]/10 flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-[#10B981]" />
            </div>
          </div>
          <h1 className="font-spaceGrotesk text-2xl font-bold text-[#C77DFF] mb-1">
            Subscription Active! 🎉
          </h1>
          <p className="font-inter text-sm text-[#C77DFF]/60">
            Your subscription is now active. Enjoy unlimited boosts!
          </p>
        </div>

        {activeBuff && (
          <div className="bg-[#240046] rounded-xl border border-[#3C096C] overflow-hidden mb-6">
            <div className="p-4 border-b border-[#3C096C]">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-[#5A189A]/10 flex items-center justify-center text-3xl">
                  {activeBuff.buff.emoji}
                </div>
                <div>
                  <h2 className="font-spaceGrotesk text-lg font-bold text-[#C77DFF]">
                    {activeBuff.buff.name || "Subscription"}
                  </h2>
                  <p className="font-inter text-xs text-[#C77DFF]/60">
                    {activeBuff.buff.tagline || "Recurring boost"}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-inter text-xs text-[#C77DFF]/60 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  Status
                </span>
                <span className="font-inter text-xs font-medium text-[#10B981] bg-[#10B981]/10 px-2 py-0.5 rounded-full">
                  Active
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="font-inter text-xs text-[#C77DFF]/60 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  Next Billing
                </span>
                <span className="font-inter text-xs text-[#C77DFF]">
                  {dateHelper.formatLongDateWithTime(activeBuff.expiresAt)}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="font-inter text-xs text-[#C77DFF]/60 flex items-center gap-1">
                  <Repeat className="w-3 h-3" />
                  Billing Period
                </span>
                <span className="font-inter text-xs text-[#C77DFF]">
                  Weekly
                </span>
              </div>
            </div>

            <div className="px-4 pb-4">
              <div className="bg-[#10002B]/50 rounded-lg p-3 border border-[#3C096C]">
                <p className="font-inter text-xs text-[#C77DFF]/80 italic text-center">
                  You'll be billed Weekly.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Link
            href="/my-buffs"
            className="flex items-center justify-center gap-2 py-3 px-4 bg-[#5A189A] hover:bg-[#7B2CBF] text-[#C77DFF] font-inter text-sm font-medium rounded-lg transition-colors group"
          >
            <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            View My Active Buffs
          </Link>

          <Link
            href="/boosting-station"
            className="flex items-center justify-center gap-2 py-3 px-4 border border-[#3C096C] hover:border-[#5A189A] text-[#C77DFF]/80 hover:text-[#C77DFF] font-inter text-sm rounded-lg transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
            Get More Buffs
          </Link>
        </div>

        <div className="text-center mt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1 font-inter text-xs text-[#C77DFF]/40 hover:text-[#C77DFF]/60 transition-colors"
          >
            <Home className="w-3 h-3" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
