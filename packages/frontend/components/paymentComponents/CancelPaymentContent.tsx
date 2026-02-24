"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  XCircle,
  ArrowLeft,
  HelpCircle,
  ShoppingBag,
  Home,
  Sparkles,
} from "lucide-react";

const CancelPaymentContent = () => {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  // Dummy data for preview
  const popularBuffs = [
    { name: "Patience", emoji: "🧘", tagline: "Stay calm under pressure" },
    {
      name: "Strength",
      emoji: "💪",
      tagline: "Feel physically and mentally empowered",
    },
    { name: "Courage", emoji: "🦁", tagline: "Face fears with bravery" },
    { name: "Focus", emoji: "🎯", tagline: "Concentrate deeply on tasks" },
  ];

  return (
    <div className="min-h-screen bg-[#10002B] flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Main Cancel Card */}
        <div className="bg-[#240046] rounded-2xl border border-[#3C096C] overflow-hidden mb-6">
          {/* Header */}
          <div className="p-8 text-center border-b border-[#3C096C]">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-[#EF4444]/20 blur-2xl rounded-full"></div>
              <div className="relative w-20 h-20 mx-auto rounded-full bg-[#EF4444]/10 flex items-center justify-center">
                <XCircle className="w-12 h-12 text-[#EF4444]" />
              </div>
            </div>

            <h1 className="font-spaceGrotesk text-3xl font-bold text-[#C77DFF] mb-2">
              Payment Cancelled
            </h1>

            <p className="font-inter text-[#C77DFF]/60">
              Your payment was cancelled. No charges were made.
            </p>
          </div>

          {/* Help Section */}
          <div className="p-6 bg-[#10002B]/50 border-b border-[#3C096C]">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#5A189A]/20 flex items-center justify-center flex-shrink-0">
                <HelpCircle className="w-5 h-5 text-[#5A189A]" />
              </div>
              <div>
                <h2 className="font-inter font-medium text-[#C77DFF] mb-1">
                  Why was my payment cancelled?
                </h2>
                <p className="font-inter text-sm text-[#C77DFF]/60">
                  Payments are typically cancelled when you:
                </p>
                <ul className="mt-2 space-y-1 text-sm text-[#C77DFF]/60">
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[#C77DFF]/60"></span>
                    Click "Cancel" during checkout
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[#C77DFF]/60"></span>
                    Close the browser window before completing
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[#C77DFF]/60"></span>
                    Decline the payment confirmation
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Popular Buffs Preview */}
          <div className="p-6">
            <h2 className="font-spaceGrotesk text-xl font-bold text-[#C77DFF] mb-4">
              Still interested? ✨
            </h2>
            <p className="font-inter text-[#C77DFF]/60 mb-4">
              Check out our most popular buffs:
            </p>

            <div className="grid grid-cols-2 gap-3 mb-6">
              {popularBuffs.map((buff) => (
                <div
                  key={buff.name}
                  className="bg-[#10002B] rounded-xl p-3 border border-[#3C096C] hover:border-[#5A189A] transition-colors group cursor-pointer"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl">{buff.emoji}</span>
                    <span className="font-spaceGrotesk font-bold text-[#C77DFF] group-hover:text-[#E0AAFF] transition-colors">
                      {buff.name}
                    </span>
                  </div>
                  <p className="font-inter text-xs text-[#C77DFF]/60 line-clamp-2">
                    {buff.tagline}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="p-6 bg-[#10002B]/50 border-t border-[#3C096C] space-y-3">
            <Link
              href="/boosting-station"
              className="flex items-center justify-center gap-2 w-full py-4 px-6 bg-[#5A189A] hover:bg-[#7B2CBF] text-[#C77DFF] font-inter font-medium rounded-xl transition-colors group"
            >
              <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Browse All Buffs
            </Link>

            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/"
                className="flex items-center justify-center gap-2 py-3 px-4 border border-[#3C096C] hover:border-[#5A189A] text-[#C77DFF]/80 hover:text-[#C77DFF] font-inter rounded-xl transition-colors"
              >
                <Home className="w-4 h-4" />
                Home
              </Link>

              <Link
                href="/my-buffs"
                className="flex items-center justify-center gap-2 py-3 px-4 border border-[#3C096C] hover:border-[#5A189A] text-[#C77DFF]/80 hover:text-[#C77DFF] font-inter rounded-xl transition-colors"
              >
                <Sparkles className="w-4 h-4" />
                My Buffs
              </Link>
            </div>
          </div>
        </div>

        {/* Session ID Reference */}
        {sessionId && (
          <p className="text-center font-inter text-xs text-[#C77DFF]/40">
            Session ID: {sessionId.substring(0, 16)}...
          </p>
        )}

        {/* Need Help Link */}
        <div className="text-center mt-4">
          <Link
            href="/support"
            className="inline-flex items-center gap-1 font-inter text-sm text-[#C77DFF]/40 hover:text-[#C77DFF]/60 transition-colors"
          >
            <HelpCircle className="w-3 h-3" />
            Need help? Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CancelPaymentContent;
