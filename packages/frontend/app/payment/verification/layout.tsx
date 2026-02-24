import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verifying Payment | BuffBoost",
  description: "Verifying your payment. Please wait while we confirm your transaction...",
  robots: {
    index: false,
    follow: false,
  },
};

export default function VerifyPaymentLayout({
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
