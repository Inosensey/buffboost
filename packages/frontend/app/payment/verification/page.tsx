"use server";

import VerifyPaymentContent from "@/components/paymentComponents/VerifyPaymentContent";

const VerifyPage = async () => {
  return (
    <div className="flex items-center justify-center font-sans">
      <VerifyPaymentContent />
    </div>
  );
};

export default VerifyPage;
