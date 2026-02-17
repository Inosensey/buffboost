import type { Metadata } from "next";

import Nav from "@/components/reusableComponents/Nav";
import SideBar from "@/components/reusableComponents/SideBar";

export const metadata: Metadata = {
  title: "Boosting Station | BuffBoost Virtual Buff Marketplace",
  description:
    "Browse and purchase 7+ personality buffs: +Patience, +Luck, +Strength, +Focus. Choose up to 3 active buffs. FREE checkout simulation.",
};

export default function MyBuffsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full h-screen relative">
      <Nav />
      <SideBar />
      <div className="w-full phone:pt-0 mdphone:pt-12">{children}</div>
    </div>
  );
}
