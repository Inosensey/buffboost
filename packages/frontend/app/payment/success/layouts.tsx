
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Payment Successful | BuffBoost - Your Buff is Activated! 🎉",
  description: "Your payment was successful! Your personality buff has been activated. Start leveling up your real-life stats today with Patience, Strength, Courage, and more.",
  robots: {
    index: false,
    follow: false,
  },
  keywords: ['buff boost', 'payment success', 'personality buffs', 'boost activated'],
  authors: [{ name: 'BuffBoost' }],
};


const SuccessPaymentLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="w-full h-screen relative">
      <div className="w-full">{children}</div>
    </div>
  );
}

export default SuccessPaymentLayout