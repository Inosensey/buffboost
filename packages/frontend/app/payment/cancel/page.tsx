"use server";

import CancelPaymentContent from "@/components/paymentComponents/CancelPaymentContent";

const CancelPaymentPage = async () => {
  return (
    <div className="flex items-center justify-center font-sans">
      <CancelPaymentContent />
    </div>
  );
};

export default CancelPaymentPage;
