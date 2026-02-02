import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Buff Boost - Sign In",
    description: "Start Your Buff Journey Today!",
};

export default function SignInLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <div className="w-full h-screen">
      {children}
    </div>
  );
}
