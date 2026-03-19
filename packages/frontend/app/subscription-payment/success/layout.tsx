import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Subscription Active! | BuffBoost",
  description:
    "Your subscription is now active! Enjoy your buffs and level up your real-life stats.",
  openGraph: {
    title: "Subscription Active! | BuffBoost",
    description: "Your subscription is now active! Enjoy your buffs.",
    images: ["/og-subscription-success.jpg"],
  },
};
export default function SubscriptionSuccessPaymentLayout({
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
