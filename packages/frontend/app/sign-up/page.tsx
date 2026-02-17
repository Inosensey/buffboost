"use server"

import SignUpContent from "@/components/authComponents/signUp/SignUpContent"

export default async function UserSignUpPage() {
  return (
    <div className="flex h-screen items-center justify-center font-sans">
      <main className="flex h-screen w-full flex-col items-center justify-center">
        <SignUpContent />
      </main>
    </div>
  )
}