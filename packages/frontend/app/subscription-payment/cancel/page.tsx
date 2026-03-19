"use server";

import CancelPaymentContent from "@/components/subscriptionPaymentComponents/CancelPaymentContent";
import { Suspense } from "react";

const SubscriptionCancelPaymentPage = async () => {
  return (
    <Suspense fallback={<div>Loading payment details...</div>}>
      <div className="flex items-center justify-center font-sans">
        <CancelPaymentContent />
      </div>
    </Suspense>
  );
};

export default SubscriptionCancelPaymentPage;
