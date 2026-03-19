"use client";
import { startTransition, useActionState, useEffect, useState } from "react";
import { createStripeCheckoutSession } from "@/actions/paymentActions";

import { Sparkles, Package } from "lucide-react";

// Components
import Overlay from "./Overlay";
import LoadingPopUp from "./LoadingPopUp";

// Icons
import { RotatingSquare } from "react-loader-spinner";
import { useRouter } from "nextjs-toploader/app";

// Types
interface props {
  setToggleCheckout: React.Dispatch<React.SetStateAction<boolean>>;
  selectedBuffs: Buff[];
}

// Initials
const useFormStateInitials: ApiResponse<stripeSession | null> = {
  success: false,
  message: "",
  data: null,
};

const Checkout = ({ setToggleCheckout, selectedBuffs }: props) => {
  const formData = new FormData();
  const router = useRouter();

  console.log(selectedBuffs);

  // UseFormState
  const [formState, formAction] = useActionState(
    createStripeCheckoutSession,
    useFormStateInitials,
  );

  // States
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitMessage, setSubmitMessage] = useState<string>("");

  // Events
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    // Step 1
    setSubmitMessage("⚡ Initializing checkout...");
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Step 2
    setSubmitMessage("🛒 Preparing your items...");
    await new Promise((resolve) => setTimeout(resolve, 800));

    const items: checkoutItem[] = [];
    let checkoutType:string = "";

    selectedBuffs.forEach((buff, index) => {
      buff.type === "instantBuffs" ? checkoutType = "instantBuffs" : checkoutType = "dailyBlessings";
      items.push({
        buffId: buff.id,
        priceId: buff.stripePriceId,
      });
    });

    const checkoutItemsPayload = JSON.stringify(items);

    formData.append("checkoutItems", checkoutItemsPayload);
    formData.append("checkoutType", checkoutType);

    setSubmitMessage("🔗 Contacting payment gateway...");
    await new Promise((resolve) => setTimeout(resolve, 500));

    startTransition(() => {
      formAction(formData);
    });
  };

  // useEffect
  useEffect(() => {
    if (formState.success !== null) {
      if (formState.success) {
        setSubmitMessage(
          "🔗 Checkout session created successfully! Connecting to Stripe...",
        );
        const timer = setTimeout(() => {
          router.push(formState.data!.url!);
        }, 1500);
        return () => clearTimeout(timer);
      } else {
        setIsSubmitting(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState]);

  return (
    <>
      <Overlay clickEvent={() => console.log("Clicked outside - close modal")}>
        <div className="bg-[#10002B] py-2 px-4 mx-auto">
          <div className="max-w-2xl mx-auto">
            <div className="w-full flex items-center justify-between mb-8">
              <div className="text-center">
                <h1 className="font-oxanium text-2xl font-bold text-[#C77DFF] mb-1">
                  Checkout
                </h1>
              </div>
              <div
                onClick={() => {
                  setToggleCheckout(false);
                }}
                className="w-6 h-6 bg-Danger rounded-full flex items-center justify-center cursor-pointer"
              >
                <span className="text-white text-sm font-bold">X</span>
              </div>
            </div>

            {/* Multiple Items? Show Count */}
            {selectedBuffs.length > 1 && (
              <div className="flex items-center gap-2 bg-[#240046] rounded-lg px-4 py-2 mb-4 border border-[#3C096C]">
                <Package className="w-4 h-4 text-[#5A189A]" />
                <p className="font-inter text-xs text-[#C77DFF]/80">
                  You've Selected{" "}
                  <span className="font-bold text-[#C77DFF]">
                    {selectedBuffs.length} buffs
                  </span>
                </p>
              </div>
            )}

            {/* Purchase Details Cards */}
            <div className="flex flex-col items-center gap-2 max-h-[500px] overflow-auto">
              {selectedBuffs.map((purchase, index) => (
                <div
                  key={purchase.id}
                  className="bg-[#240046] w-full rounded-xl border border-[#3C096C] overflow-hidden"
                >
                  {/* Buff Header */}
                  <div className="p-4 border-b border-[#3C096C]">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-[#5A189A]/10 flex items-center justify-center text-3xl">
                        {purchase.emoji}
                      </div>
                      <div>
                        <h2 className="font-spaceGrotesk text-lg font-bold text-[#C77DFF]">
                          {purchase.name}
                        </h2>
                        <p className="font-inter text-xs text-[#C77DFF]/60">
                          {purchase.tagline}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Buff Details */}
                  <div className="p-4">
                    <div className="flex justify-between items-center">
                      <span className="font-inter text-xs text-[#C77DFF]/60">
                        Amount Paid
                      </span>
                      <span className="font-inter text-xs text-[#C77DFF] font-medium">
                        ${purchase.price.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons - Consistent sizing */}
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="cursor-pointer flex items-center justify-center gap-2 py-3 px-4 bg-Success hover:bg-SuccessDark text-white font-inter text-sm font-medium rounded-lg transition-colors group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                  {isSubmitting ? "Processing..." : "Checkout My Buffs"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Overlay>
      <LoadingPopUp
        isLoading={isSubmitting}
        message={submitMessage}
        LoadingAnimationIcon={
          <RotatingSquare
            visible={true}
            height="60"
            width="60"
            ariaLabel="rotating-square-loading"
            wrapperStyle={{}}
            color="#7B2CBF"
            wrapperClass=""
          />
        }
      />
    </>
  );
};

export default Checkout;
