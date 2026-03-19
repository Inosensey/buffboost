"use server";

import SuccessPaymentContent from "@/components/subscriptionPaymentComponents/SuccessPaymentContent";
import { nestJsEndpoints } from "@/lib/nestJsEndpoints";
import { Suspense } from "react";


// Types
interface props {
  searchParams: Promise<{ session_id: string }>;
}

const SubscriptionSuccessPaymentPage = async ({ searchParams }: props) => {
  const params = await searchParams;

  
    const response = await nestJsEndpoints.buffsApi.getCurrentActiveBuffBySessionId(params.session_id);
    const activeBuff = response.data;

  return (
    <Suspense fallback={<div>Loading payment details...</div>}>
      <div className="flex items-center justify-center font-sans">
        <SuccessPaymentContent activeBuff={activeBuff} />
      </div>
    </Suspense>
  );
};

export default SubscriptionSuccessPaymentPage;
