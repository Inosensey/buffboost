"use client";

import SolarLoginOutline from "@/icons/SolarLoginOutline";

// Types
interface PrimaryButtonProps {
  type: "submit" | "reset" | "button";
  buttonName: string;
  Icon: React.ComponentType<{ color: string; width?: string; height?: string }>;
}

const PrimaryButton = ({ type, buttonName, Icon }: PrimaryButtonProps) => {
  return (
    <button
      className="flex gap-1 items-center bg-Primary rounded-lg py-1 px-3 cursor-pointer font-semibold font-oxanium phone:text-sm mdtablet:text-base hover:scale-[1.1] active:scale-[0.9] active:bg-Background transition-all duration-200 "
      type={type}
    >
      {buttonName}
      <Icon width="1.2em" height="1.2em" color="#fff" />
    </button>
  );
};

export default PrimaryButton;
