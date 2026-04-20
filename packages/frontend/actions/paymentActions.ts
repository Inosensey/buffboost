"use server";

import { nestJsEndpoints } from "@/lib/nestJsEndpoints";
import { updateTag } from "next/cache";
import { cookies } from "next/headers";

export const createStripeCheckoutSession = async (
  prevState: ApiResponse<stripeSession | null>,
  formData: FormData,
): Promise<ApiResponse<stripeSession | null>> => {
  const checkoutType = formData.get("checkoutType") as string;
  const checkoutItemsJson = formData.get("checkoutItems") as string;
  const checkoutItemsPayload = JSON.parse(checkoutItemsJson) as checkoutItem[];
  const cookieStore = await cookies();

  try {
    const userId = cookieStore.get("user_id")?.value;
    let response;
    if (checkoutType === "instantBuffs") {
      response =
        await nestJsEndpoints.stripesApi.createCheckoutSession(
          checkoutItemsPayload,
        );

      updateTag("buffs");
      updateTag(`purchasedBuffsToday-${userId}`);
      updateTag(`purchasedBuffsHistory-${userId}`);
    } else {
      response =
        await nestJsEndpoints.stripesApi.createCheckoutSubscriptionSession(
          checkoutItemsPayload,
        );
      updateTag(`activeBuff-${userId}`);
    }

    if (!response.success) {
      return {
        success: false,
        data: null,
        message: `Failed to create checkout session: ${response.message}`,
      };
    }

    return response;
  } catch (error) {
    console.log(error);
    const errorMessage: string =
      error instanceof Error
        ? `There is an error Creating Checkout Session: ${error.message}`
        : "An unknown error occurred";
    return {
      success: false,
      data: null,
      message: errorMessage,
    };
  }
};

export const cancelSubscription = async (
  prevState: ApiResponse<any | null>,
  formData: FormData,
): Promise<ApiResponse<any | null>> => {
  const stripeSubscriptionId = formData.get("stripeSubscriptionId") as string;  
  const immediate = formData.get("immediate") as string === "true" ? true : false;

  const cookieStore = await cookies();
  const userId = cookieStore.get("user_id")?.value;

  try {

    const response = await nestJsEndpoints.stripesApi.cancelSubscription(stripeSubscriptionId, immediate);
    
    if (!response.success) {
      return {
        success: false,
        data: null,
        message: `Failed to cancel subscription: ${response.message}`,
      };
    }

    updateTag(`activeBuff-${userId}`);

    return response;
  } catch (error) {
    console.log(error);
    const errorMessage: string =
      error instanceof Error
        ? `There is an error Canceling Subscription: ${error.message}`
        : "An unknown error occurred";
    return {
      success: false,
      data: null,
      message: errorMessage,
    };
  }
};
