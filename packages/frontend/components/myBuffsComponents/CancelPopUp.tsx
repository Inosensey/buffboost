import { CheckCircle, ShoppingBag, XCircle } from "lucide-react";
import Overlay from "../reusableComponents/Overlay";
import { startTransition, useActionState, useEffect, useState } from "react";
import { cancelSubscription } from "@/actions/paymentActions";
import { RotatingSquare } from "react-loader-spinner";
import Link from "next/link";

// types
interface props {
  setToggleCancelPopup: React.Dispatch<React.SetStateAction<boolean>>;
  stripeSubscriptionId: string;
}

// Initials
const useFormStateInitials: ApiResponse<any | null> = {
  success: false,
  message: "",
  data: null,
};

const CancelPopUp = ({ setToggleCancelPopup, stripeSubscriptionId }: props) => {
  const formData = new FormData();

  // UseFormState
  const [formState, formAction] = useActionState(
    cancelSubscription,
    useFormStateInitials,
  );
  // States
  const [isSubmitting, setIsSubmitting] = useState<boolean | null>(null);
  const [submitMessage, setSubmitMessage] = useState<string>("");

  // events
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsSubmitting(true);

    setSubmitMessage("⚡ Initializing connection...");
    await new Promise((resolve) => setTimeout(resolve, 800));

    formData.append("stripeSubscriptionId", stripeSubscriptionId);
    formData.append("immediate", "true");

    setSubmitMessage("🔗 Contacting payment gateway...");
    await new Promise((resolve) => setTimeout(resolve, 500));

    startTransition(() => {
      formAction(formData);
    });
  };

  // UseEffect
  useEffect(() => {
    if (formState.success !== null) {
      if (formState.success) {
        setIsSubmitting(false);
      } else {
        setIsSubmitting(false);
      }
    }
  }, [formState]);

  return (
    <Overlay>
      <div className="w-full h-full flex justify-center items-center">
        <div className="bg-[#240046] rounded-2xl border border-[#3C096C] overflow-hidden max-w-[95%]">
          {isSubmitting === false && !formState.success && (
            <div className="p-8 text-center border-b border-[#3C096C]">
              <div className="relative mb-2">
                <div className="absolute inset-0 bg-[#EF4444]/20 blur-lg rounded-full"></div>
                <div className="relative w-14 h-14 mx-auto rounded-full bg-[#EF4444]/10 flex items-center justify-center">
                  <XCircle className="w-8 h-8 text-[#EF4444]" />
                </div>
              </div>

              <h1 className="font-spaceGrotesk text-xl font-bold text-[#C77DFF] mb-1">
                Are you sure you want to cancel your subscription?
              </h1>

              <p className="font-inter text-[#C77DFF]/60 text-sm w-[95%] mx-auto">
                This action is irreversible. You can always resubscribe later to
                regain access.
              </p>

              <div className="mx-auto w-max flex gap-5 mt-4 font-inter">
                <form onSubmit={handleSubmit}>
                  <button className="bg-Danger text-white py-1 px-6 rounded-lg hover:bg-Danger/80 transition-colors">
                    Yes
                  </button>
                </form>
                <button
                  onClick={() => setToggleCancelPopup(false)}
                  className="bg-Secondary text-text py-1 px-6 rounded-lg hover:bg-Secondary/80 transition-colors"
                >
                  No
                </button>
              </div>
            </div>
          )}
          {isSubmitting && (
            <div
              className={`${isSubmitting ? "fixed" : "hidden"} top-0 left-0 z-[100] bg-black/[0.5] w-screen h-screen flex justify-center items-center`}
            >
              <div className="bg-Foreground flex flex-col items-center justify-center rounded-lg min-w-[300px] max-w-[450px] phone:w-11/12 laptop:w-9/12 shadow-[0_0_0_1px_rgba(90,24,154,0.7),0_10px_30px_rgba(90,24,154,0.45)]">
                <RotatingSquare
                  visible={true}
                  height="60"
                  width="60"
                  ariaLabel="rotating-square-loading"
                  wrapperStyle={{}}
                  color="#7B2CBF"
                  wrapperClass=""
                />
                <p className="text-center py-2 px-6 font-semibold font-dmSans text-sm">
                  🔗 Contacting payment gateway...
                </p>
              </div>
            </div>
          )}
          {isSubmitting === false && formState.success && (
            <div className="p-8 text-center border-b border-[#3C096C]">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-[#10B981]/20 blur-2xl rounded-full"></div>
                <div className="relative w-14 h-14 mx-auto rounded-full bg-[#10B981]/10 flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-[#10B981]" />
                </div>
              </div>

              <h2 className="font-spaceGrotesk text-xl font-bold text-[#C77DFF] mb-2">
                Daily Blessings Successfully Canceled ✅
              </h2>

              <p className="text-sm font-inter text-[#C77DFF]/60 mb-6 border-[#3C096C] flex items-center gap-1 text-center py-1 px-2 w-max mx-auto">
                <Link
                  href="/boosting-station"
                  className="flex items-center gap-1 underline cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Click Here</span>
                </Link>
                to get new Daily Blessings!
              </p>
              <button
                onClick={() => setToggleCancelPopup(false)}
                className="font-spaceGrotesk font-semibold bg-Secondary text-text py-1 px-6 rounded-lg hover:bg-Secondary/80 transition-colors"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </Overlay>
  );
};

export default CancelPopUp;
