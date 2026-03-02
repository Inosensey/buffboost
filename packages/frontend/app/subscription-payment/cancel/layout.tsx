import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Subscription Cancelled | BuffBoost",
  description: "Your subscription was cancelled. No charges were made. You can still purchase one-time buffs.",
  robots: {
    index: false,
    follow: false,
  },
};
export default function CancelPaymentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full h-screen relative">
      <div className="w-full">{children}</div>
    </div>
  );
}
