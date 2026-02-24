"use server";

import SuccessPaymentContent from "@/components/paymentComponents/SuccessPaymentContent";

const SuccessPaymentPage = async () => {
  return (
    <div className="flex items-center justify-center font-sans">
      <SuccessPaymentContent />
    </div>
  );
};

export default SuccessPaymentPage;
