"use server";

import VerifyPaymentContent from "@/components/paymentComponents/VerifyPaymentContent";
import { Suspense } from "react";

const VerifyPage = async () => {
  return (
    <Suspense fallback={<div>Loading payment details...</div>}>
      <div className="flex items-center justify-center font-sans">
        <VerifyPaymentContent />
      </div>
    </Suspense>
  );
};

export default VerifyPage;
