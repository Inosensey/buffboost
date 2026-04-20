import { cookies } from "next/headers";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

class NestJsEndpoints {
  private serverToken: string | null = null;
  private user_id: string | null = null;
  private email: string | null = null;
  private responseInterceptor: ((headers: Headers) => Promise<void>) | null =
    null;

  setServerToken(token: string | null) {
    this.serverToken = token;
  }

  onResponse(callback: (headers: Headers) => Promise<void>) {
    this.responseInterceptor = callback;
  }

  async initFromCookies() {
    const cookieStore = await cookies();
    this.setServerToken(cookieStore.get("token")?.value || null);
    this.user_id = cookieStore.get("user_id")?.value || null;
    this.email = cookieStore.get("email")?.value || null;
  }

  async setUserData(userId: string, email: string) {
    this.user_id = userId;
    this.email = email;

    const cookieStore = await cookies();
    cookieStore.set("user_id", userId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });
    cookieStore.set("email", email, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });
  }

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (typeof window === "undefined" && this.serverToken) {
      headers.Cookie = `token=${this.serverToken}`;
    }

    return headers;
  }

  async request<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<ApiResponse<T>> {
    const isServer = typeof window === "undefined";
    const response = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers: {
        ...this.getHeaders(),
        ...options.headers,
      },
      ...(isServer ? {} : { credentials: "include" as RequestCredentials }),
      mode: "cors",
    });

    if (endpoint.includes("/sign-in") && this.responseInterceptor) {
      await this.responseInterceptor(response.headers);
    }

    return response.json();
  }

  // ==== API methods ==== //

  // BUFFS API
  buffsApi = {
    getAll: async (): Promise<ApiResponse<Buff[]>> => {
      await this.initFromCookies();
      return this.request("/buffs", { next: { tags: ["buffs"] } });
    },
    getPurchasedBuffs: async (
      sessionId: string,
    ): Promise<ApiResponse<purchasedBuff[]>> => {
      await this.initFromCookies();
      return this.request(`/buffs/purchased-buffs/${sessionId}`, {
        next: { tags: ["purchasedBuffs", sessionId] },
      });
    },
    getCurrentPurchasedBuffsToday: async (): Promise<
      ApiResponse<purchasedBuff[]>
    > => {
      await this.initFromCookies();
      return this.request(`/buffs/purchased-buffs-today/${this.user_id}`, {
        next: { tags: ["purchasedBuffsToday", this.user_id!] },
      });
    },
    getCurrentPurchasedBuffsHistory: async (): Promise<
      ApiResponse<purchasedBuff[]>
    > => {
      await this.initFromCookies();
      return this.request(`/buffs/purchased-buffs-history/${this.user_id}`, {
        next: { tags: ["purchasedBuffsHistory", this.user_id!] },
      });
    },
    getCurrentActiveBuff: async (): Promise<ApiResponse<ActiveBuff | null>> => {
      await this.initFromCookies();
      return this.request(`/buffs/active-buff/${this.user_id}`, {
        next: { tags: ["activeBuff", this.user_id!] },
      });
    },
    getCurrentActiveBuffBySessionId: async (
      sessionId: string,
    ): Promise<ApiResponse<ActiveBuff | null>> => {
      await this.initFromCookies();
      return this.request(`/buffs/buff-subscription/${sessionId}`, {
        next: { tags: ["buffSubscription", sessionId] },
      });
    },
  };

  // USERS API
  usersApi = {
    signUp: async (data: {
      firstName: string;
      lastName: string;
      email: string;
      username: string;
      password: string;
      userTypeId: string;
    }): Promise<ApiResponse<User>> => {
      return this.request("/users/auth/sign-up", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    signIn: async (data: {
      email: string;
      password: string;
    }): Promise<
      ApiResponse<{ userId: string; email: string; userType: string } | null>
    > => {
      const response: ApiResponse<{
        userId: string;
        email: string;
        userType: string;
      } | null> = await this.request("/users/auth/sign-in", {
        method: "POST",
        body: JSON.stringify(data),
      });

      if (response.success && response.data)
        await this.setUserData(response.data.userId, response.data.email);

      return response;
    },
    signOut: async () => {
      return this.request("users/auth/sign-out");
    },
  };

  // STRIPES API
  stripesApi = {
    createCheckoutSession: async (
      checkoutItems: checkoutItem[],
    ): Promise<ApiResponse<stripeSession>> => {
      await this.initFromCookies();

      const checkoutPayload: checkoutPayload = {
        items: checkoutItems,
        userId: this.user_id!,
        email: this.email!,
        paymentModel: "ONE_TIME",
      };
      return this.request("/stripe/create-checkout", {
        method: "POST",
        body: JSON.stringify(checkoutPayload),
      });
    },
    createCheckoutSubscriptionSession: async (
      checkoutItems: checkoutItem[],
    ): Promise<ApiResponse<stripeSession>> => {
      await this.initFromCookies();

      const checkoutPayload: checkoutPayload = {
        items: checkoutItems,
        userId: this.user_id!,
        email: this.email!,
        paymentModel: "SUBSCRIPTION",
      };
      return this.request("/stripe/create-subscription-checkout", {
        method: "POST",
        body: JSON.stringify(checkoutPayload),
      });
    },
    verifyPayment: async (sessionId: string): Promise<ApiResponse<Buff[]>> => {
      return this.request(`/stripe/verify-payment`, {
        method: "POST",
        body: JSON.stringify({ sessionId }),
      });
    },
    cancelSubscription: async (
      stripeSubscriptionId: string,
      immediate: boolean,
    ): Promise<ApiResponse<any>> => {
      await this.initFromCookies();
      return this.request(`/stripe/cancel-subscription`, {
        method: "POST",
        body: JSON.stringify({ stripeSubscriptionId, immediate }),
      });
    },
  };
}

export const nestJsEndpoints = new NestJsEndpoints();
