"use server";

import { nestJsEndpoints } from "@/lib/nestJsEndpoints";
import { cookies } from "next/headers";

export const createStripeCheckoutSession = async (
  prevState: ApiResponse<stripeSession | null>,
  formData: FormData,
): Promise<ApiResponse<stripeSession | null>> => {
  const checkoutType = formData.get("checkoutType") as string;
  const checkoutItemsJson = formData.get("checkoutItems") as string;
  const checkoutItemsPayload = JSON.parse(checkoutItemsJson) as checkoutItem[];

  try {
    let response;
    if (checkoutType === "instantBuffs") {
      response =
        await nestJsEndpoints.stripesApi.createCheckoutSession(
          checkoutItemsPayload,
        );
    } else {
      response =
        await nestJsEndpoints.stripesApi.createCheckoutSubscriptionSession(
          checkoutItemsPayload,
        );
    }

    if (!response.success) {
      return {
        success: false,
        data: null,
        message: `Failed to create checkout session: ${response.message}`,
      };
    }

    console.log(response);

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
