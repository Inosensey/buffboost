"use server";

import { Suspense } from "react";
import { cookies } from "next/headers";

// lib/Api
import { nestJsEndpoints } from "@/lib/nestJsEndpoints";

import SuccessPaymentContent from "@/components/paymentComponents/SuccessPaymentContent";

// Types
interface props {
  searchParams: Promise<{ session_id: string }>;
}

const SuccessPaymentPage = async ({ searchParams }: props) => {
  const params = await searchParams;

  const response = await nestJsEndpoints.buffsApi.getPurchasedBuffs(params.session_id);

  return (
    <Suspense fallback={<div>Loading payment details...</div>}>
      <div className="flex items-center justify-center font-sans">
        <SuccessPaymentContent purchaseBuffs={response.data} />
      </div>
    </Suspense>
  );
};

export default SuccessPaymentPage;
