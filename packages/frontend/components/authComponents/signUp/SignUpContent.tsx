"use client";

import Link from "next/link";
import { useRouter } from "nextjs-toploader/app";
import { useActionState, useEffect, useState } from "react";

// Actions
import { signUp } from "@/actions/authActions";

// Utils
import FormValidation, {
  checkValidations,
  validateGroupInput,
} from "utils/validation";
import { signUpValidationRules } from "utils/validationRules";

// Components
import PrimaryButton from "@/components/reusableComponents/buttons/PrimaryButton";
import TextField from "@/components/reusableComponents/inputs/TextField";
import LoadingPopUp from "@/components/reusableComponents/LoadingPopUp";

// Icons
import SolarLoginOutline from "@/icons/SolarLoginOutline";
import StreamlineLogosFacebookGamingLogoBlock from "@/icons/StreamlineLogosFacebookGamingLogoBlock";
import { RotatingSquare } from "react-loader-spinner";

// Initials
const useFormStateInitials: ApiResponse<User | null> = {
  success: false,
  message: "",
  data: null,
};
const signUpValidationInitials: formValidation = {
  firstName: {
    valid: null,
    validationMessage: "",
  },
  lastName: {
    valid: null,
    validationMessage: "",
  },
  email: {
    valid: null,
    validationMessage: "",
  },
  username: {
    valid: null,
    validationMessage: "",
  },
  password: {
    valid: null,
    validationMessage: "",
  },
};
const registerInputInitials = {
  firstName: "",
  lastName: "",
  email: "",
  username: "",
  password: "",
};

const SignUpContent = () => {
  const router = useRouter();

  // UseFormState
  const [formState, formAction] = useActionState(signUp, useFormStateInitials);

  // States
  const [signUpInput, setSignUpInput] = useState(registerInputInitials);
  const [signUpValidation, setSignUpValidation] = useState<formValidation>(
    signUpValidationInitials,
  );
  const [formIsValid, setFormIsValid] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitMessage, setSubmitMessage] = useState<string>("");

  // Events
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    const validationParams = {
      stateName: name,
      value: value,
    };

    const validationResult: validation = FormValidation(validationParams);

    setSignUpValidation((prev) => ({
      ...prev,
      [validationResult.validationName as string]: {
        valid: validationResult.valid,
        validationMessage: validationResult.validationMessage,
      },
    }));

    setSignUpInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (!formIsValid) {
      event.preventDefault();
    }
  };

  // useEffect
  useEffect(() => {
    if (formState.success !== null) {
      console.log(formState);
      if (formState.success) {
        setSubmitMessage("✨ Buff container ready! Redirecting to sign in");
        const timer = setTimeout(() => {
          router.push("/sign-in");
        }, 1500);

        return () => clearTimeout(timer);
      } else {
        setIsSubmitting(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState]);

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-2 rounded-md bg-Foreground py-2 px-4 phone:w-[95%] mdtablet:w-[50%] laptop:w-[25%] shadow-[0_0_0_1px_rgba(90,24,154,0.7),0_10px_30px_rgba(90,24,154,0.45)]">
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
        <form
          action={formAction}
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-4"
        >
          <div className="w-full flex flex-col gap-2">
            <div className="w-full">
              <TextField
                type="text"
                label="First Name"
                name="firstName"
                value={signUpInput.firstName}
                fill={false}
                haveLabelHTML={true}
                valid={signUpValidation.firstName.valid}
                validationMessage={signUpValidation.firstName.validationMessage}
                onChange={onChange}
              />
            </div>
            <div className="w-full">
              <TextField
                type="text"
                label="Last Name"
                name="lastName"
                value={signUpInput.lastName}
                fill={false}
                haveLabelHTML={true}
                valid={signUpValidation.lastName.valid}
                validationMessage={signUpValidation.lastName.validationMessage}
                onChange={onChange}
              />
            </div>
            <div className="w-full">
              <TextField
                type="email"
                label="Email"
                name="email"
                value={signUpInput.email}
                fill={false}
                haveLabelHTML={true}
                valid={signUpValidation.email.valid}
                validationMessage={signUpValidation.email.validationMessage}
                onChange={onChange}
              />
            </div>
            <div className="w-full">
              <TextField
                type="text"
                label="Username"
                name="username"
                value={signUpInput.username}
                fill={false}
                haveLabelHTML={true}
                valid={signUpValidation.username.valid}
                validationMessage={signUpValidation.username.validationMessage}
                onChange={onChange}
              />
            </div>
            <div className="w-full">
              <TextField
                type="password"
                label="Password"
                name="password"
                value={signUpInput.password}
                fill={false}
                haveLabelHTML={true}
                valid={signUpValidation.password.valid}
                validationMessage={signUpValidation.password.validationMessage}
                onChange={onChange}
              />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-1 font-oxanium">
            <div
              onClick={() => {
                const values = {
                  firstName: signUpInput.firstName,
                  lastName: signUpInput.lastName,
                  email: signUpInput.email,
                  username: signUpInput.username,
                  password: signUpInput.password,
                };
                const validationResult = validateGroupInput(
                  values,
                  signUpValidationRules,
                );
                console.log(validationResult);
                setFormIsValid(checkValidations(validationResult));
                setIsSubmitting(true);
                setSubmitMessage("⚡ Forging your buff identity...");
              }}
              className="w-max mx-auto"
            >
              <PrimaryButton
                Icon={SolarLoginOutline}
                type="submit"
                buttonName="Sign Up"
              />
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="text-[0.8rem]">If you already have an account</p>
              <Link href="/sign-in">
                <p className="text-Tertiary text-[1] underline cursor-pointer font-semibold">
                  Sign In
                </p>
              </Link>
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

export default SignUpContent;
