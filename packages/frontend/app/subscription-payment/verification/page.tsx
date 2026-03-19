"use server";

import VerifyPaymentContent from "@/components/subscriptionPaymentComponents/VerifyPaymentContent";
import { Suspense } from "react";

const SubscriptionVerifyPaymentPage = async () => {
  return (
    <Suspense fallback={<div>Loading payment details...</div>}>
      <div className="flex items-center justify-center font-sans">
        <VerifyPaymentContent />
      </div>
    </Suspense>
  );
};

export default SubscriptionVerifyPaymentPage;
