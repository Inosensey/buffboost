"use client";

// Types
interface props {
  key: string;
  buffInfo: BuffInterface;
}

const BuffTimelineCard = ({ buffInfo }: props) => {
  const typeColors: Record<
    string,
    { bg: string; border: string; selectedBg: string }
  > = {
    instantBuffs: {
      bg: "from-Primary/20 to-Secondary/20",
      border: "border-Primary/30",
      selectedBg: "from-Archive/30 to-ArchiveLight/30",
    },
    dailyBlessings: {
      bg: "from-Tertiary/20 to-Text/20",
      border: "border-Tertiary/30",
      selectedBg: "from-Archive/30 to-ArchiveLight/30",
    },
  };
  return (
    <div
      className={`
        group font-spaceGrotesk flex items-center
        h-[130px] phone:w-full mdphone:w-[380px] mdtablet:w-[310px] laptop:w-[300px] desktop:w-[310px] rounded-xl px-3
        transition-all duration-300 ease-out 
        border-2 border-Archive
        transform-gpu
        will-change-transform, shadow, border-color
        relative
        overflow-hidden 
        bg-gradient-to-br from-ArchiveGlow/10 via-ArchiveGlow/5 to-transparent
        bg-Background
    `}
    >
      <div className="flex items-center justify-between w-full">
        <div
          className={`
          w-14 h-14 rounded-xl flex items-center justify-center
          bg-gradient-to-br ${typeColors[buffInfo.type].selectedBg}
          transition-all duration-300
          scale-110
          shadow-glow-gold
      `}
        >
          <span className="text-3xl">{buffInfo.emoji}</span>
        </div>

        <div className="text-center w-[75%]">
          <h3
            className={`
          font-spaceGrotesk font-bold mb-1
          text-ArchiveLight
        `}
          >
            {buffInfo.name}
          </h3>
          <p
            className={`
          font-inter text-[0.75rem] mb-2 line-clamp-2
          text-ArchiveLight/80
        `}
          >
            {buffInfo.description}
          </p>
          {buffInfo.tagline && (
            <div
              className={`
            font-inter text-[0.7rem] font-medium px-2 py-1 rounded-full 
            bg-Archive/20 text-ArchiveLight border border-Archive/30 

          `}
            >
              {buffInfo.tagline}
            </div>
          )}
        </div>
      </div>
      <>
        <div className="absolute inset-0 bg-gradient-to-br from-ArchiveGlow/5 via-transparent to-transparent rounded-xl" />
        <div className="absolute -inset-2 bg-gradient-to-r from-ArchiveGlow/0 via-ArchiveGlow/10 to-ArchiveGlow/0 blur-xl rounded-xl" />
      </>
    </div>
  );
};

export default BuffTimelineCard;
