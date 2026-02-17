"use client";

import Link from "next/link";

// Components
import PrimaryButton from "@/components/reusableComponents/buttons/PrimaryButton";
import TextField from "@/components/reusableComponents/inputs/TextField";

// Icons
import SolarLoginOutline from "@/icons/SolarLoginOutline";
import StreamlineLogosFacebookGamingLogoBlock from "@/icons/StreamlineLogosFacebookGamingLogoBlock";

const SignInContent = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-Foreground gap-2 rounded-md py-2 px-4 phone:w-[95%] mdtablet:w-[50%] laptop:w-[22%] shadow-[0_10px_30px_rgba(90,24,154,0.45)]">
      <div className="font-spaceGrotesk mt-1 flex flex-col justify-center items-center">
        <div className="flex items-center gap-1 w-max">
          <p className="phone:text-xl">
            <span className="text-Text font-semibold">BuffBoost!</span>
          </p>{" "}
          <StreamlineLogosFacebookGamingLogoBlock
            color="#5A189A"
            width="1.5em"
            height="1.5em"
          />
        </div>
        <p className="phone:text-base phone:text-center">
          Start Your Buff boosting Journey Today!
        </p>
      </div>
      <div className="w-full flex flex-col gap-4">
        <div className="w-full flex flex-col gap-2">
          <div className="w-full">
            <TextField
              type="text"
              label="Username"
              name="username"
              required={true}
              fill={false}
              haveLabelHTML={true}
            />
          </div>
          <div className="w-full">
            <TextField
              type="password"
              label="Password"
              name="password"
              required={true}
              fill={false}
              haveLabelHTML={true}
            />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-1 font-oxanium">
          <div className="w-max mx-auto">
            <PrimaryButton Icon={SolarLoginOutline} type="button" buttonName="Sign In" />
          </div>
          <div className="flex flex-col items-center justify-center">
            <p className="text-[0.8rem]">OR</p>
            <Link href="/sign-up">
              <p className="text-Tertiary text-[1rem] underline cursor-pointer font-semibold">
                Sign Up
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInContent;
