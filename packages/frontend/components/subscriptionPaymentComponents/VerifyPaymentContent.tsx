'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, XCircle, Loader2, ArrowRight, Home, Sparkles } from 'lucide-react';

export default function VerifyPaymentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [countdown, setCountdown] = useState(3);
  const [subscriptionDetails, setSubscriptionDetails] = useState<any>(null);

  useEffect(() => {
    if (!sessionId) {
      setStatus('error');
      return;
    }

    const verifySubscription = async () => {
      try {
        // Call your backend to verify the subscription
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/stripe/verify-subscription?session_id=${sessionId}`
        );
        
        const data = await response.json();

        if (data.success) {
          setStatus('success');
          setSubscriptionDetails(data.subscription);
        } else {
          setStatus('error');
        }
      } catch (error) {
        console.error('Verification error:', error);
        setStatus('error');
      }
    };

    verifySubscription();
  }, [sessionId]);

  useEffect(() => {
    if (status === 'success' && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
    
    if (status === 'success' && countdown === 0) {
      router.push(`/subscription/success?session_id=${sessionId}`);
    }
  }, [status, countdown, router, sessionId]);

  const getBuffEmoji = (buffName: string) => {
    const emojiMap: Record<string, string> = {
      'Patience': '🧘',
      'Strength': '💪',
      'Courage': '🦁',
      'Wisdom': '🦉',
      'Charisma': '✨',
      'Focus': '🎯',
      'Luck': '🍀',
      'Creativity': '🎨',
      'default': '⚡'
    };
    return emojiMap[buffName] || emojiMap.default;
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-[#10002B] flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <div className="relative">
            <div className="w-24 h-24 mx-auto mb-6 relative">
              <div className="absolute inset-0 rounded-full bg-[#5A189A]/20 animate-ping"></div>
              <div className="absolute inset-0 rounded-full bg-[#5A189A]/40 animate-pulse"></div>
              <Loader2 className="w-24 h-24 text-[#5A189A] animate-spin relative z-10" />
            </div>
          </div>
          <h2 className="font-spaceGrotesk text-2xl font-bold text-[#C77DFF] mb-2">
            Verifying Your Subscription
          </h2>
          <p className="font-inter text-[#C77DFF]/60">
            Please wait while we confirm your subscription with Stripe...
          </p>
          
          <div className="mt-8 h-1 w-full bg-[#3C096C] rounded-full overflow-hidden">
            <div className="h-full bg-[#5A189A] animate-[progress_2s_ease-in-out_infinite]"></div>
          </div>
          
          <p className="mt-4 font-inter text-xs text-[#C77DFF]/40">
            Session ID: {sessionId?.substring(0, 16)}...
          </p>
        </div>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div className="min-h-screen bg-[#10002B] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-[#240046] rounded-2xl p-8 border border-[#3C096C] text-center">
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-[#10B981]/20 blur-2xl rounded-full"></div>
            <div className="relative w-20 h-20 mx-auto rounded-full bg-[#10B981]/10 flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-[#10B981]" />
            </div>
          </div>

          <h2 className="font-spaceGrotesk text-2xl font-bold text-[#C77DFF] mb-2">
            Subscription Active! ✅
          </h2>
          
          <p className="font-inter text-[#C77DFF]/60 mb-6">
            Your subscription has been confirmed successfully.
          </p>

          {subscriptionDetails && (
            <div className="bg-[#10002B]/50 rounded-xl p-4 mb-6 border border-[#3C096C]">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-[#5A189A]/10 flex items-center justify-center text-3xl">
                  {getBuffEmoji(subscriptionDetails.buff?.name || '')}
                </div>
                <div className="flex-1 text-left">
                  <p className="font-spaceGrotesk font-bold text-[#C77DFF]">
                    {subscriptionDetails.buff?.name || 'Subscription'}
                  </p>
                  <p className="font-inter text-sm text-[#C77DFF]/60">
                    Renews {new Date(subscriptionDetails.currentPeriodEnd).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <div className="flex items-center justify-center gap-2 text-[#C77DFF]/80">
              <div className="w-6 h-6 rounded-full bg-[#5A189A]/20 flex items-center justify-center">
                <span className="text-sm font-bold text-[#5A189A]">{countdown}</span>
              </div>
              <p className="font-inter">
                Redirecting to success page...
              </p>
            </div>

            <div className="w-full h-1 bg-[#3C096C] rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#10B981] transition-all duration-1000"
                style={{ width: `${((3 - countdown) / 3) * 100}%` }}
              ></div>
            </div>

            <button
              onClick={() => router.push(`/subscription/success?session_id=${sessionId}`)}
              className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-[#5A189A] hover:bg-[#7B2CBF] text-[#C77DFF] font-inter font-medium rounded-xl transition-colors group"
            >
              Continue Now
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#10002B] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-[#240046] rounded-2xl p-8 border border-[#3C096C]">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-[#EF4444]/10 flex items-center justify-center">
            <XCircle className="w-12 h-12 text-[#EF4444]" />
          </div>
          <h2 className="font-spaceGrotesk text-2xl font-bold text-[#C77DFF] mb-2">
            Verification Failed
          </h2>
          <p className="font-inter text-[#C77DFF]/60 mb-6">
            We couldn't verify your subscription. Please contact support.
          </p>
          <div className="space-y-3">
            <Link
              href="/boosting-station"
              className="block w-full py-3 px-4 bg-[#5A189A] hover:bg-[#7B2CBF] text-[#C77DFF] font-inter font-medium rounded-xl transition-colors"
            >
              Return to Boosting Station
            </Link>
            <Link
              href="/"
              className="flex items-center justify-center gap-2 w-full py-3 px-4 border border-[#3C096C] hover:border-[#5A189A] text-[#C77DFF]/80 hover:text-[#C77DFF] font-inter rounded-xl transition-colors"
            >
              <Home className="w-4 h-4" />
              Go to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}