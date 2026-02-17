"use client";

// Types
interface props {
  key: string;
  buffInfo: BuffInterface;
  isSelected: boolean;
  onSelect: (buffName: string) => void;
  maxSelections: number;
  currentSelections: number;
}

const BuffCard = ({
  buffInfo,
  currentSelections,
  isSelected,
  onSelect,
  maxSelections,
}: props) => {
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
      className={`
        group font-spaceGrotesk flex flex-col items-center
        h-[320px] phone:w-full mdphone:w-[390px] mdtablet:w-[300px] laptop:w-[280px] desktop:w-[300px] rounded-xl p-5 
        transition-all duration-300 ease-out 
        border-2 ${isSelected ? "border-Success" : typeColors[buffInfo.type].border}
        transform-gpu
        will-change-transform, shadow, border-color
        relative
        overflow-hidden
        ${
          isSelected
            ? "bg-gradient-to-br from-SuccessGlow/10 via-SuccessGlow/5 to-transparent"
            : "bg-Background"
        }
        ${
          !isSelected &&
          `
          hover:shadow-[0_12px_40px_rgba(90,24,154,0.3)]
          hover:scale-[1.01]
          hover:border-Primary/60
        `
        }
        ${
          isSelected &&
          `
          shadow-glow-green
          animate-pulse-green
          border-Success
          bg-Background
        `
        }
        ${
          !isSelected &&
          currentSelections >= maxSelections &&
          `
          opacity-60
          cursor-not-allowed
          hover:scale-100
          hover:shadow-none
          hover:border-Primary/30
        `
        }
    `}
    >
      {isSelected && (
        <div className="absolute top-3 z-10 w-full">
          <div className="flex justify-between w-full px-3">
            <div
              onClick={() => onSelect(buffInfo.name)}
              className="w-8 h-8 bg-Danger rounded-full flex items-center justify-center cursor-pointer"
            >
              <span className="text-white text-sm font-bold">X</span>
            </div>
            <div className="w-8 h-8 bg-Success rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">✓</span>
            </div>
          </div>
        </div>
      )}

      <div
        className={`
          w-14 h-14 rounded-xl flex items-center justify-center mb-4
          bg-gradient-to-br ${isSelected ? typeColors[buffInfo.type].selectedBg : typeColors[buffInfo.type].bg}
          transition-all duration-300
          ${isSelected ? "scale-110" : "group-hover:scale-110"}
          ${isSelected && "shadow-glow-green"}
      `}
      >
        <span className="text-3xl">{buffInfo.emoji}</span>
      </div>

      <div className="text-center flex-1">
        <h3
          className={`
          font-spaceGrotesk text-lg font-bold mb-1
          ${isSelected ? "text-SuccessLight" : "text-Text group-hover:text-SoftBackground"}
        `}
        >
          {buffInfo.name}
        </h3>
        <p
          className={`
          font-inter text-sm mb-2 line-clamp-2
          ${isSelected ? "text-SuccessLight/80" : "text-Text/80"}
        `}
        >
          {buffInfo.description}
        </p>
        {buffInfo.tagline && (
          <div
            className={`
            font-inter text-xs font-medium px-2 py-1 rounded-full
            ${
              isSelected
                ? "bg-Success/20 text-SuccessLight border border-Success/30"
                : "bg-Primary/10 text-Primary"
            }
          `}
          >
            {buffInfo.tagline}
          </div>
        )}
      </div>

      <div className="w-full mt-4">
        <div className="flex items-center justify-between mb-3">
          <div
            className={`
            text-xl font-bold
            ${isSelected ? "text-SuccessLight" : "text-Text"}
          `}
          >
            ${buffInfo.price === 0 ? "0.00" : buffInfo.price!.toFixed(2)}
          </div>
          <div
            className={`
            text-xs px-2 py-1 rounded font-medium
            ${
              isSelected
                ? "bg-Success/20 text-SuccessLight"
                : "bg-Foreground text-SoftBackground"
            }
          `}
          >
            {buffInfo.type === "instantBuffs" ? "24H" : "DAILY"}
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelect(buffInfo.name);
          }}
          className={`
            w-full py-2 rounded-lg font-semibold text-sm
            transition-all duration-300
            transform active:scale-95
            disabled:opacity-50 disabled:cursor-not-allowed
            ${
              isSelected
                ? "bg-gradient-to-r from-Success to-SuccessDark text-white shadow-glow-green"
                : currentSelections >= maxSelections
                  ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                  : `bg-gradient-to-r ${buffInfo.type === "instantBuffs" ? "from-Primary to-Secondary" : "from-Tertiary to-Text"} text-white hover:shadow-lg`
            }
        `}
        >
          {isSelected
            ? "✓ Selected"
            : currentSelections >= maxSelections
              ? `Max ${maxSelections} reached`
              : buffInfo.type === "instantBuffs"
                ? "Select Boost"
                : "Subscribe"}
        </button>
      </div>
      {isSelected && (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-SuccessGlow/5 via-transparent to-transparent rounded-xl" />
          <div className="absolute -inset-2 bg-gradient-to-r from-SuccessGlow/0 via-SuccessGlow/10 to-SuccessGlow/0 blur-xl rounded-xl" />
        </>
      )}
    </div>
  );
};

export default BuffCard;
