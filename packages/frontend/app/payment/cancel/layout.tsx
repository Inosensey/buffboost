import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payment Cancelled | BuffBoost - No Charges Made",
  description: "Your payment was cancelled. No charges were made. Return to the boosting station to try again or explore other personality buffs like Patience, Strength, and Courage.",
  robots: {
    index: false,
    follow: false,
  },
  keywords: ['buff boost', 'payment cancelled', 'checkout cancelled', 'try again'],
  authors: [{ name: 'BuffBoost' }],
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
