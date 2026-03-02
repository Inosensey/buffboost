"use server";

import SuccessPaymentContent from "@/components/subscriptionPaymentComponents/SuccessPaymentContent";
import { Suspense } from "react";

const SuccessPaymentPage = async () => {
  return (
    <Suspense fallback={<div>Loading payment details...</div>}>
      <div className="flex items-center justify-center font-sans">
        <SuccessPaymentContent />
      </div>
    </Suspense>
  );
};

export default SuccessPaymentPage;
