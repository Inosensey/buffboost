"use server";

import { Suspense } from "react";
import { cookies } from "next/headers";

// lib/Api
import { nestJsEndpoints } from "@/lib/nestJsEndpoints";

// Components
import VerifyPaymentContent from "@/components/paymentComponents/VerifyPaymentContent";


// Types
interface props {
  searchParams: Promise<{ session_id: string }>;
}
const VerifyPage = async ({ searchParams }: props) => {
  // Get cookies from the incoming request
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  
  nestJsEndpoints.setServerToken(token || null);

  const params = await searchParams;

  const response = await nestJsEndpoints.buffsApi.getPurchasedBuffs(params.session_id);
  
  console.log(response);
  return (
    <Suspense fallback={<div>Loading payment details...</div>}>
      <div className="flex items-center justify-center font-sans">
        <VerifyPaymentContent />
      </div>
    </Suspense>
  );
};

export default VerifyPage;
