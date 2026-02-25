"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle,
  Home,
  ShoppingBag,
  Sparkles,
  Calendar,
  Clock,
  Package,
} from "lucide-react";

const DUMMY_PURCHASES = [
  {
    id: "dummy-purchase-123",
    amount: 29.99,
    endDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    buff: {
      name: "Patience",
      emoji: "🧘",
      description: "Stay calm under pressure. Zen mode activated.",
      tagline: "Find your inner peace",
    },
  },
  {
    id: "dummy-purchase-456",
    amount: 29.99,
    endDate: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
    buff: {
      name: "Strength",
      emoji: "💪",
      description:
        "Feel physically and mentally empowered. Unlock your inner powerhouse.",
      tagline: "Feel physically and mentally empowered",
    },
  },
  {
    id: "dummy-purchase-789",
    amount: 29.99,
    endDate: new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString(),
    buff: {
      name: "Focus",
      emoji: "🎯",
      description: "Concentrate deeply on tasks. Laser precision mode.",
      tagline: "Concentrate deeply on tasks",
    },
  },
];

const SuccessPaymentContent = () => {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id") || "dummy_session_123";
  const [purchases] = useState(DUMMY_PURCHASES); // For preview with multiple items
  // const [purchases] = useState([DUMMY_PURCHASES[0]]); // For single item preview

  const [formattedDate, setFormattedDate] = useState<string | null>(null);

  const getBuffEmoji = (buffName: string) => {
    const emojiMap: Record<string, string> = {
      Patience: "🧘",
      Strength: "💪",
      Courage: "🦁",
      Wisdom: "🦉",
      Charisma: "✨",
      Focus: "🎯",
      Luck: "🍀",
      default: "⚡",
    };
    return emojiMap[buffName] || emojiMap.default;
  };

  useEffect(() => {
    // This runs only on the client, fixing the hydration mismatch
    setFormattedDate(new Date().toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }));
  }, []);

  return (
    <div className="min-h-screen bg-[#10002B] py-2 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-[#10B981]/20 blur-2xl rounded-full"></div>
            <div className="relative w-16 h-16 mx-auto mb-3 rounded-full bg-[#10B981]/10 flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-[#10B981]" />
            </div>
          </div>
          <h1 className="font-spaceGrotesk text-2xl font-bold text-[#C77DFF] mb-1">
            Welcome to the Club!
          </h1>
          <p className="font-inter text-sm text-[#C77DFF]/60">
            Your boost has been activated. Get ready to level up!
          </p>
        </div>

        {/* Multiple Items? Show Count */}
        {purchases.length > 1 && (
          <div className="flex items-center gap-2 bg-[#240046] rounded-lg px-4 py-2 mb-4 border border-[#3C096C]">
            <Package className="w-4 h-4 text-[#5A189A]" />
            <p className="font-inter text-xs text-[#C77DFF]/80">
              You've activated{" "}
              <span className="font-bold text-[#C77DFF]">
                {purchases.length} buffs
              </span>
            </p>
          </div>
        )}

        {/* Purchase Details Cards */}
        <div className="space-y-4 mb-6">
          {purchases.map((purchase, index) => (
            <div
              key={purchase.id}
              className="bg-[#240046] rounded-xl border border-[#3C096C] overflow-hidden"
            >
              {/* Buff Header */}
              <div className="p-4 border-b border-[#3C096C]">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-[#5A189A]/10 flex items-center justify-center text-3xl">
                    {getBuffEmoji(purchase.buff.name)}
                  </div>
                  <div>
                    <h2 className="font-spaceGrotesk text-lg font-bold text-[#C77DFF]">
                      {purchase.buff.name}
                    </h2>
                    <p className="font-inter text-xs text-[#C77DFF]/60">
                      {purchase.buff.tagline}
                    </p>
                  </div>
                </div>
              </div>

              {/* Buff Details */}
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
                    Valid Until
                  </span>
                  <span className="font-inter text-xs text-[#C77DFF]">
                    {formattedDate}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="font-inter text-xs text-[#C77DFF]/60">
                    Amount Paid
                  </span>
                  <span className="font-inter text-xs text-[#C77DFF] font-medium">
                    ${purchase.amount}
                  </span>
                </div>
              </div>

              {/* Buff Description - Only show for first item or if you want all */}
              {index === 0 && (
                <div className="px-4 pb-4">
                  <div className="bg-[#10002B]/50 rounded-lg p-3 border border-[#3C096C]">
                    <p className="font-inter text-xs text-[#C77DFF]/80 italic">
                      "{purchase.buff.description}"
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Action Buttons - Consistent sizing */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Link
            href="/my-buffs"
            className="flex items-center justify-center gap-2 py-3 px-4 bg-[#5A189A] hover:bg-[#7B2CBF] text-[#C77DFF] font-inter text-sm font-medium rounded-lg transition-colors group"
          >
            <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            View My Active Boosts
          </Link>

          <Link
            href="/boosting-station"
            className="flex items-center justify-center gap-2 py-3 px-4 border border-[#3C096C] hover:border-[#5A189A] text-[#C77DFF]/80 hover:text-[#C77DFF] font-inter text-sm rounded-lg transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
            Get More Boosts
          </Link>
        </div>

        {/* Back to Home */}
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
};

export default SuccessPaymentContent;
