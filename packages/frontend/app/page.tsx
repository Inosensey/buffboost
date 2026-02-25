"use server";

import Image from "next/image";
import { Sparkles } from "lucide-react";
import StreamlineLogosFacebookGamingLogoBlock from "@/icons/StreamlineLogosFacebookGamingLogoBlock";

export default async function Home() {
  return (
    <div className="flex items-center justify-center font-sans dark:bg-black">
      <main className="flex w-full flex-col items-center justify-center dark:bg-black">
        <div className="phone:w-[95%] phone:my-2 laptop:my-0 laptop:w-7/12 flex flex-col items-center justify-center gap-2 rounded-md p-2 shadow-[0_0_0_1px_rgba(90,24,154,0.7),0_10px_30px_rgba(90,24,154,0.45)]">
          <div className="font-spaceGrotesk mt-1 flex flex-col justify-center items-center">
            <div className="flex items-center gap-1 w-max">
              <p className="phone:text-xl laptop:text-2xl">
                Welcome to{" "}
                <span className="text-Text font-semibold">BuffBoost!</span>
              </p>{" "}
              <StreamlineLogosFacebookGamingLogoBlock
                color="#5A189A"
                width="1.5em"
                height="1.5em"
              />
            </div>
            <p className="phone:text-lg phone:text-center laptop:text-xl">
              🌟 Supercharge Your Day with{" "}
              <span className="text-Text font-semibold">Virtual Buffs</span>
            </p>
          </div>
          <div className="font-oxanium">
            <p className="w-11/12 text-justify mx-auto phone:text-[0.9rem] laptop:text-base">
              Welcome to BuffBoost, where you can purchase temporary personality
              upgrades that make your day a little more awesome! Start by
              browsing our buff collection and give your day that extra edge!
              Whether you need more focus for work, patience for that long
              meeting, or just a sprinkle of luck - we've got you covered.
            </p>
          </div>
          <div className="flex justify-center phone:flex-col phone:w-11/12 laptop:w-full mdtablet:flex-row">
            <div className="flex flex-col gap-1 phone:w-full laptop:w-1/2">
              <p className="font-oxanium text-Text underline phone:text-[0.95rem] laptop:text-[1.1rem]">
                How it works:
              </p>
              <div className="phone:text-[0.8rem] laptop:border-Divider laptop:text-sm laptop:border-r-[1px] laptop:pr-[0.5rem] font-inter flex flex-col gap-1">
                <p>Choose your favorite buffs (up to 3 at a time)</p>
                <p>
                  Purchase using our secure checkout (don't worry, it's all FREE
                  in demo mode! 💸)
                </p>
                <p>Receive your buff instantly</p>
                <p>Get daily deliveries 📧 for recurring buffs like +Luck</p>
                <p>Watch your stats improve! 📈</p>
              </div>
            </div>
            <div className="flex flex-col gap-1 phone:w-full laptop:w-1/2 laptop:px-[0.5rem]">
              <p className="font-oxanium text-Text underline phone:text-[0.95rem] laptop:text-[1.1rem]">
                Special Features:
              </p>
              <div className="phone:text-[0.8rem] laptop:border-r-[1px] laptop:border-Divider laptop:text-sm font-inter flex flex-col gap-1">
                <p>
                  Live Activity Feed - See what others are buying in real-time
                </p>
                <p>
                  Daily Email Delivery - Get your buff reminders straight to
                  your inbox
                </p>
                <p>Buff Inventory - Track all your active boosts</p>
                <p>
                  Community Stats - See how many buffs have been purchased
                  worldwide
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center gap-1 phone:w-11/12 laptop:w-full">
            <div className="flex flex-col">
              <p className="font-oxanium text-Text underline text-[1.1rem]">
                What Can You Buy?
              </p>
              <p className="font-inter">
                Boost your stats with our special buffs:
              </p>
            </div>
            <div className="flex phone:flex-col mdtablet:flex-row mdtablet:flex-wrap items-center font-inter gap-2 text-[0.95rem] phone:w-full mdtablet:w-8/12">
              <p className="mdtablet:w-[48%] border-2 border-Divider rounded-lg py-[0.4rem] px-2">
                <span className="font-spaceGrotesk text-SoftBackground underline">
                  +Patience
                </span>{" "}
                🧘 - Stay calm under pressure
              </p>
              <p className="mdtablet:w-[48%] border-2 border-Divider rounded-lg py-[0.4rem] px-2">
                <span className="font-spaceGrotesk text-SoftBackground underline">
                  +Strength
                </span>{" "}
                💪 - Feel empowered all day
              </p>
              <p className="mdtablet:w-[48%] border-2 border-Divider rounded-lg py-[0.4rem] px-2">
                <span className="font-spaceGrotesk text-SoftBackground underline">
                  +Luck
                </span>{" "}
                🍀 - Bring good fortune your way
              </p>
              <p className="mdtablet:w-[48%] border-2 border-Divider rounded-lg py-[0.4rem] px-2">
                <span className="font-spaceGrotesk text-SoftBackground underline">
                  +Wisdom
                </span>{" "}
                🦉 - Make wiser decisions
              </p>
              <p className="mdtablet:w-[48%] border-2 border-Divider rounded-lg py-[0.4rem] px-2">
                <span className="font-spaceGrotesk text-SoftBackground underline">
                  +Courage
                </span>{" "}
                🦁 - Face challenges bravely
              </p>
              <p className="mdtablet:w-[48%] border-2 border-Divider rounded-lg py-[0.4rem] px-2">
                <span className="font-spaceGrotesk text-SoftBackground underline">
                  +Charisma
                </span>{" "}
                😎 - Shine in social situations
              </p>
              <p className="mdtablet:w-[48%] border-2 border-Divider rounded-lg py-[0.4rem] px-2">
                <span className="font-spaceGrotesk text-SoftBackground underline">
                  +Focus
                </span>{" "}
                🎯 - Get in the zone and crush your tasks
              </p>
            </div>
          </div>
          <div>
            <button className="flex items-center gap-1 bg-Secondary rounded-md py-2 px-3 cursor-pointer font-semibold font-oxanium hover:scale-[1.1] active:scale-[0.9] active:bg-Background transition-all duration-200">
              Start Your Buff Journey
              <Sparkles className="w-5 h-5" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
