"use server";

import { nestJsEndpoints } from "@/lib/nestJsEndpoints";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { checkValidations, validateGroupInput } from "utils/validation";
import { signUpValidationRules } from "utils/validationRules";

export const signUp = async (
  prevState: ApiResponse<User | null>,
  formData: FormData,
): Promise<ApiResponse<User | null>> => {
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const email = formData.get("email") as string;
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  const values = {
    firstName,
    lastName,
    email,
    username,
    password,
  };
  const validationResults = validateGroupInput(values, signUpValidationRules);
  const isValid = checkValidations(validationResults);

  if (!isValid) {
    const message: string[] = [];
    for (const [key, result] of Object.entries(validationResults)) {
      if (result.valid === false) {
        message.push(result.validationMessage);
      }
    }
    return {
      success: false,
      data: null,
      message: message.join("\n"),
    };
  }

  const payload = {
    firstName,
    lastName,
    email,
    username,
    password,
    userTypeId: "64a41e8b-1249-460e-b231-53398609491f",
  };

  try {
    const signUpResponse = await nestJsEndpoints.usersApi.signUp(payload);

    if (!signUpResponse.success) {
      return signUpResponse;
    }

    return {
      success: true,
      data: signUpResponse.data as User,
      message: "Signed Up successfully. Redirecting to Sign In",
    };
  } catch (error) {
    console.log(error);
    const errorMessage: string =
      error instanceof Error
        ? `There is an error Signing up: ${error.message}`
        : "An unknown error occurred";
    return {
      success: false,
      data: null,
      message: errorMessage,
    };
  }
};

export const signIn = async (
  prevState: ApiResponse<{ userId: string; userType: string } | null>,
  formData: FormData,
): Promise<ApiResponse<{ userId: string; userType: string } | null>> => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return {
      success: false,
      data: null,
      message: "Email and password are required",
    };
  }

  try {
    nestJsEndpoints.onResponse(async (headers) => {
      const setCookieHeader = headers.get("set-cookie");
      if (setCookieHeader) {
        const cookieStore = await cookies();
        const tokenMatch = setCookieHeader.match(/token=([^;]+)/);
        if (tokenMatch) {
          const token = tokenMatch[1];
          console.log(token);
          cookieStore.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 7 * 24 * 60 * 60,
            path: "/",
          });
          nestJsEndpoints.setServerToken(token);
        }
      }
    });

    const response = await nestJsEndpoints.usersApi.signIn({ email, password });

    if (!response.success) {
      return response;
    }

    return response;
  } catch (error) {
    console.log(error);
    const errorMessage: string =
      error instanceof Error
        ? `There is an error Signing in: ${error.message}`
        : "An unknown error occurred";
    return {
      success: false,
      data: null,
      message: errorMessage,
    };
  }
};

export const signOut = async (): Promise<ApiResponse<null>> => {
  const cookieStore = await cookies();
  try {
    const response = await nestJsEndpoints.usersApi.signOut();

    if (!response.success) {
      console.error("Backend sign out error:", response.message);
    }

    cookieStore.delete("token");
    cookieStore.delete("user_id");
    cookieStore.delete("email");
    nestJsEndpoints.setServerToken(null);

    return {
      success: true,
      data: null,
      message: "Signed out successfully",
    };
  } catch (error) {
    console.error("Sign out error:", error);

    cookieStore.delete("token");

    const errorMessage: string =
      error instanceof Error
        ? `Error signing out: ${error.message}`
        : "An unknown error occurred";

    return {
      success: false,
      data: null,
      message: errorMessage,
    };
  } finally {
    redirect("/sign-in");
  }
};
