"use client";

import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import { useRouter } from "nextjs-toploader/app";
import { RotatingSquare } from "react-loader-spinner";

// actions
import { signIn } from "@/actions/authActions";

// utils
import FormValidation from "utils/validation";

// Components
import PrimaryButton from "@/components/reusableComponents/buttons/PrimaryButton";
import TextField from "@/components/reusableComponents/inputs/TextField";

// Icons
import SolarLoginOutline from "@/icons/SolarLoginOutline";
import StreamlineLogosFacebookGamingLogoBlock from "@/icons/StreamlineLogosFacebookGamingLogoBlock";
import LoadingPopUp from "@/components/reusableComponents/LoadingPopUp";

// Types
interface credentials {
  email: string;
  password: string;
}

// Initials
const credentialsInitial: credentials = {
  email: "",
  password: "",
};
const useFormStateInitials: ApiResponse<{
  userId: string;
  userType: string;
} | null> = {
  success: false,
  message: "",
  data: null,
};

const SignInContent = () => {
  const router = useRouter();

  // UseFormState
  const [formState, formAction] = useActionState(signIn, useFormStateInitials);

  // useState
  const [credentials, setCredentials] =
    useState<credentials>(credentialsInitial);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitMessage, setSubmitMessage] = useState<string>("");
  const [signInFailedMessage, setSignInFailedMessage] = useState<string>("");
  const [validation, setValidation] = useState<validation>({
    valid: null,
    validationMessage: "",
    validationName: "",
  });

  // Events
  const inputOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    const validationParams = {
      value: value,
      stateName: name,
    };

    const result: validation = FormValidation(validationParams);
    if (name === "email") setValidation(result);

    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const validationParams = {
      value: credentials.email,
      stateName: "email",
    };

    const result: validation = FormValidation(validationParams);
    setValidation(result);

    if (!result.valid) {
      event.preventDefault();
      setIsSubmitting(false);
    }
  };

  // useEffect
  useEffect(() => {
    if (formState.success !== null) {
      console.log(formState);
      if (formState.success) {
        setSubmitMessage("✨ Buff activated! Redirecting to your dashboard");
        setSignInFailedMessage("");
        const timer = setTimeout(() => {
          router.push("/boosting-station");
        }, 1500);

        return () => clearTimeout(timer);
      } else {
        setSignInFailedMessage(
          formState.message || "Sign In failed. Please check your credentials.",
        );
        setIsSubmitting(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState]);

  return (
    <>
      <div className="flex flex-col items-center justify-center bg-Foreground gap-2 rounded-md py-2 px-4 phone:w-[95%] mdtablet:w-[50%] laptop:w-[25%] shadow-[0_10px_30px_rgba(90,24,154,0.45)]">
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
        <form action={formAction} onSubmit={handleSubmit} className="w-full">
          <div className="w-full flex flex-col gap-4">
            <div className="w-full flex flex-col gap-2">
              <div className="w-full">
                <TextField
                  type="email"
                  label="Email"
                  name="email"
                  value={credentials.email}
                  onChange={inputOnChange}
                  fill={false}
                  haveLabelHTML={true}
                  valid={validation.valid}
                  validationMessage={validation.validationMessage}
                />
              </div>
              <div className="w-full">
                <TextField
                  type="password"
                  label="Password"
                  name="password"
                  value={credentials.password}
                  onChange={inputOnChange}
                  fill={false}
                  haveLabelHTML={true}
                />
              </div>
              {signInFailedMessage !== "" && (
                <span className="text-[0.75rem] text-red-500 font-bold font-dmSans text-center">
                  {signInFailedMessage}
                </span>
              )}
            </div>
            <div className="flex flex-col items-center justify-center gap-1 font-oxanium">
              <div className="w-max mx-auto">
                <PrimaryButton
                  Icon={SolarLoginOutline}
                  type="submit"
                  buttonName="Sign In"
                  onClickFn={() => {
                    setSubmitMessage(
                      "⚡ Powering up... Verifying your credentials",
                    );
                    setIsSubmitting(true);
                  }}
                />
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
        </form>
      </div>
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

export default SignInContent;
