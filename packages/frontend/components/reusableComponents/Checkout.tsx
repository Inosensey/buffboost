"use client";
import { startTransition, useActionState, useEffect, useState } from "react";
import { createStripeCheckoutSession } from "@/actions/paymentActions";

import {
  Sparkles,
  Package,
  Copy,
  Check,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";

// Components
import Overlay from "./Overlay";
import LoadingPopUp from "./LoadingPopUp";

// Icons
import { RotatingSquare } from "react-loader-spinner";
import { useRouter } from "nextjs-toploader/app";
import testCards from "@/constants/testStripeCards";

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

// Selected card type
interface SelectedCard {
  brand: string;
  number: string;
  cvc: string;
  date: string;
  rawNumber: string;
}

const Checkout = ({ setToggleCheckout, selectedBuffs }: props) => {
  const formData = new FormData();
  const router = useRouter();

  // UseFormState
  const [formState, formAction] = useActionState(
    createStripeCheckoutSession,
    useFormStateInitials,
  );

  // States
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitMessage, setSubmitMessage] = useState<string>("");

  // Sandbox selection states
  const [step, setStep] = useState<1 | 2>(1); // 1: Select card, 2: Copy & checkout
  const [selectedCard, setSelectedCard] = useState<SelectedCard | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Events
  const handleCardSelect = (card: (typeof testCards)[0]) => {
    setSelectedCard({
      brand: card.brand,
      number: card.number,
      cvc: card.cvc,
      date: card.date,
      rawNumber: card.number.replace(/\s/g, ""),
    });
    setStep(2);
  };

  const handleCopyCardNumber = async () => {
    if (!selectedCard) return;
    await navigator.clipboard.writeText(selectedCard.rawNumber);
    setCopiedField("number");
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleCopyAllDetails = async () => {
    if (!selectedCard) return;
    const details = `Card: ${selectedCard.rawNumber}\nExpiry: ${selectedCard.date}\nCVV: ${selectedCard.cvc}`;
    await navigator.clipboard.writeText(details);
    setCopiedField("all");
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleBackToSelect = () => {
    setStep(1);
    setSelectedCard(null);
    setCopiedField(null);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // If in step 2, make sure user has copied the card (optional enforcement)
    if (step === 2 && !copiedField) {
      // Optional: Show warning but don't block
      console.log("Remind user to copy card details");
    }

    setIsSubmitting(true);

    setSubmitMessage("⚡ Initializing checkout...");
    await new Promise((resolve) => setTimeout(resolve, 800));

    setSubmitMessage("🛒 Preparing your items...");
    await new Promise((resolve) => setTimeout(resolve, 800));

    const items: checkoutItem[] = [];
    let checkoutType: string = "";

    selectedBuffs.forEach((buff) => {
      buff.type === "instantBuffs"
        ? (checkoutType = "instantBuffs")
        : (checkoutType = "dailyBlessings");
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
  }, [formState]);

  return (
    <>
      <Overlay clickEvent={() => console.log("Clicked outside - close modal")}>
        <div className="w-full flex justify-center items-center gap-2">
          {step === 1 && (
            <div className="bg-[#10002B] w-3/12 py-2 px-4 h-[550px] flex flex-col items-center gap-2">
              <div className="flex flex-col items-center text-center w-11/12">
                <p className="text-lg font-bold font-oxanium text-[#C77DFF]">
                  Sandbox Accounts
                </p>
                <p className="text-sm font-bold font-spaceGrotesk text-[#C77DFF] mb-2">
                  {step === 1
                    ? "Select a test card to use"
                    : "Copy before checkout"}
                </p>
              </div>
              {step === 1 && (
                <div className="w-full flex flex-col items-center gap-3 max-h-[85%] overflow-auto px-1">
                  {testCards.slice(0, 6).map((card, index) => (
                    <div
                      key={index}
                      onClick={() => handleCardSelect(card)}
                      className="group relative bg-gradient-to-br from-[#240046] to-[#1A0033] w-full rounded-2xl p-4 border-2 border-[#3C096C] hover:border-[#C77DFF] transition-all cursor-pointer hover:scale-[1.02] hover:shadow-lg hover:shadow-[#C77DFF]/10"
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <p className="font-bold text-[#C77DFF] text-sm">
                          <span className="text-base">
                            {card.brand.includes("Visa") && "💳"}
                            {card.brand.includes("Mastercard") && "💳"}
                            {card.brand.includes("American") && "💎"}
                          </span>
                          {card.brand}
                        </p>
                      </div>
                      <p className="text-base md:text-lg font-mono text-white tracking-wider mb-3 bg-black/20 py-2 px-3 rounded-lg text-center">
                        {card.number}
                      </p>
                      <div className="flex justify-between items-center text-xs">
                        <div className="flex items-center gap-1 text-[#C77DFF]/50">
                          <span>📅</span>
                          <span>{card.date}</span>
                        </div>
                        <div className="flex items-center gap-1 text-[#C77DFF]/50">
                          <span>🔐</span>
                          <span>{card.cvc}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {step === 2 && (
            <div className="bg-[#10002B] py-2 px-4 h-[710px]">
              <div className="max-w-2xl mx-auto">
                <div className="w-full flex items-center justify-between">
                  <div className="">
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
                <div>
                  {step === 2 && selectedCard && (
                    <div className="flex flex-col gap-1 mb-3">
                      <p className="text-xs text-[#C77DFF]/60 flex gap-1 items-center">
                        Using:{" "}
                        <span className="text-[#C77DFF] flex gap-1 items-center">
                          {selectedCard.brand}
                        </span>
                      </p>
                      <div className="flex flex-col gap-1">
                        <p className="text-xs text-[#C77DFF]/80 flex gap-1 items-center">
                          {selectedCard.number}{" "}
                          {copiedField === "number" ? (
                            <span className="text-[#C77DFF] underline flex gap-1 items-center">
                              <Check className="w-3 h-3" />
                              Copied!
                            </span>
                          ) : (
                            <span
                              className="text-[#C77DFF] cursor-pointer underline flex gap-1 items-center"
                              onClick={handleCopyCardNumber}
                            >
                              <Copy className="w-3 h-3" />
                              Copy Card
                            </span>
                          )}
                        </p>
                        <div className="flex gap-3">
                          <div className="flex flex-col">
                            <p className="text-xs text-[#C77DFF]/60">EXPIRES</p>
                            <p className="text-xs text-[#C77DFF]">
                              Any future date
                            </p>
                          </div>
                          <div className="flex flex-col">
                            <p className="text-xs text-[#C77DFF]/60">CVV/CVC</p>
                            <p className="text-xs text-[#C77DFF]">
                              Any 3 digits
                            </p>
                          </div>
                        </div>
                      </div>
                      <span
                        onClick={handleBackToSelect}
                        className="underline cursor-pointer text-xs text-[#C77DFF] flex items-center gap-1"
                      >
                        <ArrowLeft className="w-3 h-3" />
                        Choose a different card
                      </span>
                    </div>
                  )}
                </div>

                {/* Selected Buffs Count */}
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

                <div className="flex flex-col items-center gap-2 max-h-[400px] overflow-auto">
                  {selectedBuffs.map((purchase) => (
                    <div
                      key={purchase.id}
                      className="bg-[#240046] w-full rounded-xl border border-[#3C096C] overflow-hidden"
                    >
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

                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 gap-3 my-3">

                    {step === 2 && (
                      <div className="text-center mb-2">
                        <p className="text-xs text-[#C77DFF]/70 bg-[#240046] py-1 rounded-lg">
                          💡 Tip: Copy the card number, then paste it in Stripe
                          checkout
                        </p>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`cursor-pointer flex items-center justify-center gap-2 py-3 px-4 font-inter text-sm font-medium rounded-lg transition-colors group ${
                          "bg-Success hover:bg-SuccessDark text-white"
                      }`}
                    >
                      {isSubmitting ? (
                        "Processing..."
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                          Checkout My Buffs
                          <ChevronRight className="w-4 h-4" />
                        </>
                      )}
                    </button>

                    {step === 2 && selectedCard && !copiedField && (
                      <p className="text-center text-[10px] text-[#C77DFF]/40">
                        Don't forget to copy your test card details ☝️
                      </p>
                    )}
                  </div>
                </form>
              </div>
            </div>
          )}
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
