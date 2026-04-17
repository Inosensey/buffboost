"use client";

// Types
interface props {
  key: string;
  buffInfo: Buff;
}

const MyBuffsCard = ({ buffInfo }: props) => {
  const typeColors: Record<
    string,
    { bg: string; border: string; selectedBg: string }
  > = {
    instantBuffs: {
      bg: "from-Primary/20 to-Secondary/20",
      border: "border-Primary/30",
      selectedBg: "from-Success/30 to-SuccessLight/30",
    },
    dailyBlessings: {
      bg: "from-Tertiary/20 to-Text/20",
      border: "border-Tertiary/30",
      selectedBg: "from-Success/30 to-SuccessLight/30",
    },
  };
  return (
    <div
      key={`${buffInfo.id}-${buffInfo.createdAt}-${Math.random() * 1000}`}
      className="p-3 rounded-lg border border-Divider bg-Background/70 hover:bg-Background/90 transition-all hover:scale-[1.01]"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-2 min-w-0">
          <span className="text-2xl flex-shrink-0">{buffInfo.emoji}</span>
          <div className="min-w-0">
            <div className="flex items-center gap-1 flex-wrap">
              <span className="font-spaceGrotesk font-semibold text-Text text-sm">
                {buffInfo.name}
              </span>
            </div>
            <p className="text-xs text-Text/60 truncate">{buffInfo.tagline}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBuffsCard;
