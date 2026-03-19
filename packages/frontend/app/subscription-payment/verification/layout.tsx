import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verifying Subscription | BuffBoost",
  description:
    "Verifying your subscription payment. Please wait while we confirm your transaction...",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SubscriptionVerifyPaymentLayout({
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
