type stripeSession = {
    sessionId: string,
    url: string
}

type checkoutItem = {
    priceId: string,
    buffId: string,
}

interface checkoutPayload {
    items: checkoutItem[],
    userId: string,
    email: string,
    paymentModel: string,
}