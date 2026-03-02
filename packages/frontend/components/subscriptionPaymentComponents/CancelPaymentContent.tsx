'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { XCircle, ArrowLeft, ShoppingBag, Home, Sparkles } from 'lucide-react';

export default function CancelPaymentContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  const popularBuffs = [
    { name: 'Patience', emoji: '🧘', tagline: 'Stay calm under pressure' },
    { name: 'Strength', emoji: '💪', tagline: 'Feel physically and mentally empowered' },
    { name: 'Courage', emoji: '🦁', tagline: 'Face fears with bravery' },
    { name: 'Focus', emoji: '🎯', tagline: 'Concentrate deeply on tasks' },
  ];

  return (
    <div className="min-h-screen bg-[#10002B] flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-[#240046] rounded-2xl border border-[#3C096C] overflow-hidden mb-6">
          <div className="p-8 text-center border-b border-[#3C096C]">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-[#EF4444]/20 blur-2xl rounded-full"></div>
              <div className="relative w-20 h-20 mx-auto rounded-full bg-[#EF4444]/10 flex items-center justify-center">
                <XCircle className="w-12 h-12 text-[#EF4444]" />
              </div>
            </div>

            <h1 className="font-spaceGrotesk text-3xl font-bold text-[#C77DFF] mb-2">
              Subscription Cancelled
            </h1>
            
            <p className="font-inter text-[#C77DFF]/60">
              Your subscription was cancelled. No charges were made.
            </p>
          </div>

          <div className="p-6 bg-[#10002B]/50 border-b border-[#3C096C]">
            <h2 className="font-inter font-medium text-[#C77DFF] mb-2">
              Why was my subscription cancelled?
            </h2>
            <ul className="space-y-1 text-sm text-[#C77DFF]/60">
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-[#C77DFF]/60"></span>
                You clicked "Cancel" during checkout
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-[#C77DFF]/60"></span>
                You closed the browser before completing
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-[#C77DFF]/60"></span>
                Payment was declined (no charges made)
              </li>
            </ul>
          </div>

          <div className="p-6">
            <h2 className="font-spaceGrotesk text-xl font-bold text-[#C77DFF] mb-4">
              Try one-time buffs instead ✨
            </h2>
            
            <div className="grid grid-cols-2 gap-3 mb-6">
              {popularBuffs.map((buff) => (
                <Link
                  key={buff.name}
                  href="/boosting-station"
                  className="bg-[#10002B] rounded-xl p-3 border border-[#3C096C] hover:border-[#5A189A] transition-colors group"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl">{buff.emoji}</span>
                    <span className="font-spaceGrotesk font-bold text-[#C77DFF] group-hover:text-[#E0AAFF] transition-colors">
                      {buff.name}
                    </span>
                  </div>
                  <p className="font-inter text-xs text-[#C77DFF]/60 line-clamp-2">
                    {buff.tagline}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          <div className="p-6 bg-[#10002B]/50 border-t border-[#3C096C] space-y-3">
            <Link
              href="/boosting-station"
              className="flex items-center justify-center gap-2 w-full py-4 px-6 bg-[#5A189A] hover:bg-[#7B2CBF] text-[#C77DFF] font-inter font-medium rounded-xl transition-colors group"
            >
              <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Browse One-Time Buffs
            </Link>
            
            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/"
                className="flex items-center justify-center gap-2 py-3 px-4 border border-[#3C096C] hover:border-[#5A189A] text-[#C77DFF]/80 hover:text-[#C77DFF] font-inter rounded-xl transition-colors"
              >
                <Home className="w-4 h-4" />
                Home
              </Link>
              
              <Link
                href="/my-buffs"
                className="flex items-center justify-center gap-2 py-3 px-4 border border-[#3C096C] hover:border-[#5A189A] text-[#C77DFF]/80 hover:text-[#C77DFF] font-inter rounded-xl transition-colors"
              >
                <Sparkles className="w-4 h-4" />
                My Buffs
              </Link>
            </div>
          </div>
        </div>

        {sessionId && (
          <p className="text-center font-inter text-xs text-[#C77DFF]/40">
            Session ID: {sessionId.substring(0, 16)}...
          </p>
        )}
      </div>
    </div>
  );
}