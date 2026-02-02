"use server";

import SignInContent from "@/components/authComponents/signIn/SignInContent";

export default async function SignInPage() {
  return (
    <div className="flex h-screen items-center justify-center font-sans">
      <main className="flex h-screen w-full flex-col items-center justify-center">
        <SignInContent />
      </main>
    </div>
  );
}
