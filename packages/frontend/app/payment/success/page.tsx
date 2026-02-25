"use server";

import { Suspense } from "react";
import SuccessPaymentContent from "@/components/paymentComponents/SuccessPaymentContent";

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
