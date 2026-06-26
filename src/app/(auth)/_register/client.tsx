"use client";

import FormProvider from "@/components/hook-form-provider";
import CustomFormInput from "@/components/input/custom-form-input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { UserCaptchaMockup, UserCaptchaMockupType } from "@/schema/captcha";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle, HeartPulse } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import RegisterAssignmentForm from "../_components/register-assignment/form";
import UserRegistrationForm from "../_components/register-form/form";
import SuccessRegisterDialog from "../_components/success-register-dialog";
import IntroDialog from "../_components/intro-dialog";
import { useRouter } from "next/navigation";

export default function RegisterClient() {
  const [step, setStep] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [successAssignmentDialog, setSuccssAssignmentDialog] = useState(false);
  const [isIntroduceDialog, setIsIntroduceDialog] = useState(false);
  const router = useRouter();

  return (
    <>
      {/* Main Registration Steps */}
      <RegisterFormSection setStep={setStep} step={step} />
      <CaptchaMockup setStep={setStep} step={step} />
      <OTPEmail setStep={setStep} step={step} />
      <RegisterSuccess setIsDialogOpen={setIsDialogOpen} step={step} />

      {/* Dialog for Multi-Step Assignment Form */}
      <Dialog onOpenChange={setIsDialogOpen} open={isDialogOpen}>
        <DialogContent className="w-[780px] max-w-none !rounded-[18px] !p-0">
          <RegisterAssignmentForm
            setIsDialogOpen={setIsDialogOpen}
            setIsSuccessDialogOpen={setSuccssAssignmentDialog}
          />
        </DialogContent>
      </Dialog>

      {/* Dialog for Success Dialog*/}
      <Dialog onOpenChange={setSuccssAssignmentDialog} open={successAssignmentDialog}>
        <DialogContent className="w-[780px] max-w-none !rounded-[18px] !p-0">
          <SuccessRegisterDialog
            setIsDialogOpen={setSuccssAssignmentDialog}
            setIsIntroduceDialogOpen={setIsIntroduceDialog}
          />
        </DialogContent>
      </Dialog>

      {/* Dialog for Introduction Dialog*/}
      <Dialog
        onOpenChange={open => {
          setIsIntroduceDialog(open);
          if (!open) {
            router.push("/referrals");
          }
        }}
        open={isIntroduceDialog}
      >
        <DialogContent className="w-[780px] max-w-none !rounded-[18px]">
          <IntroDialog />
        </DialogContent>
      </Dialog>
    </>
  );
}

export function RegisterFormSection({
  step,
  setStep,
}: {
  step: number;
  setStep: (value: number) => void;
}) {
  return (
    step === 1 && (
      <div className="flex w-full flex-col items-center">
        <span className="mb-6 rounded-lg bg-[#1569EF] p-2">
          <HeartPulse className="size-8 text-white" />
        </span>
        <h1 className="mb-3 text-2xl font-medium">Create Your App Account</h1>
        <p className="mb-10 text-sm font-normal">Register and use our services now</p>
        <div className="px-28">
          <UserRegistrationForm setStep={setStep} step={step} />
        </div>

        <footer className="mt-32 flex w-full items-center justify-between text-[10px] text-gray-500">
          <p>© 2024 Lorem Inc. All rights reserved.</p>
          <div className="flex space-x-4">
            <Link className="hover:underline" href="/privacy">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link className="hover:underline" href="/terms">
              Terms & Conditions
            </Link>
          </div>
        </footer>
      </div>
    )
  );
}

export function CaptchaMockup({
  step,
  setStep,
}: {
  step: number;
  setStep: (value: number) => void;
}) {
  const methods = useForm<UserCaptchaMockupType>({
    resolver: zodResolver(UserCaptchaMockup),
    defaultValues: {
      captcha: "",
    },
  });

  const {
    formState: { errors },
    watch,
  } = methods;

  const { captcha } = watch();

  const onSubmit = (data: UserCaptchaMockupType) => {
    console.log("Form Data", data);
    setStep(step + 1);
  };

  return (
    step === 2 && (
      <div className="w-full px-[122px]">
        <Card className="!p-6">
          <CardContent className="!p-0">
            <FormProvider methods={methods} onSubmit={onSubmit}>
              <div className="flex w-full flex-col items-center space-y-6">
                <div className="space-y-3">
                  <h1 className="text-justify text-2xl font-semibold">
                    Solve this puzzle to protect your accout
                  </h1>
                  <Image
                    alt="Captcha Mockup"
                    className="w-full"
                    height={129}
                    src="/img/captcha-mockup.svg"
                    width={316}
                  />
                  <CustomFormInput
                    error={errors.captcha?.message}
                    label="Enter the letters and numbers above"
                    name="captcha"
                    placeholder=""
                  />
                </div>
                <div className="flex items-center justify-center space-x-[6px] py-[2px]">
                  <Link
                    className="text-sm font-normal text-[#648EFA] hover:underline"
                    href="/privacy"
                  >
                    See new characters
                  </Link>
                  <div className="h-3 w-px bg-[#D9D9D9]" />
                  <Link
                    className="text-sm font-normal text-[#648EFA] hover:underline"
                    href="/privacy"
                  >
                    Hear the characters
                  </Link>
                </div>
                <Button
                  className="mt-6 w-full bg-[#1569EF] !font-normal !text-white hover:bg-gray-300 disabled:bg-gray-300"
                  disabled={Boolean(captcha === "")}
                  type="submit"
                  variant="outline"
                >
                  Continue
                </Button>
              </div>
            </FormProvider>
          </CardContent>
        </Card>
      </div>
    )
  );
}

export function OTPEmail({ step, setStep }: { step: number; setStep: (value: number) => void }) {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (element: HTMLInputElement, index: number) => {
    const value = element.value;
    if (isNaN(Number(value))) return false;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Move to next input if current field is filled
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      // Move to previous input on backspace if current field is empty
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    pastedData.split("").forEach((value, index) => {
      newOtp[index] = value;
      inputRefs.current[index]?.setAttribute("value", value);
    });
    setOtp(newOtp);
    inputRefs.current[Math.min(pastedData.length, 5)]?.focus();
  };

  return (
    step === 3 && (
      <div className="mx-auto w-full max-w-sm space-y-6 p-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Check Your Email</h1>
          <p className="text-sm text-muted-foreground">
            We have sent the OTP code to the email you entered,
            <br />
            please check the inbox.
          </p>
        </div>

        <div className="flex justify-center gap-2" onPaste={handlePaste}>
          {otp.map((digit, index) => (
            <Input
              className={cn(
                "h-12 w-12 appearance-none p-0 text-center text-lg",
                "focus:ring-2 focus:ring-primary focus:ring-offset-0"
              )}
              inputMode="numeric"
              key={index}
              maxLength={1}
              onChange={e => handleChange(e.target, index)}
              onKeyDown={e => handleKeyDown(e, index)}
              ref={(el: HTMLInputElement | null): void => {
                inputRefs.current[index] = el;
              }}
              type="text"
              value={digit}
            />
          ))}
        </div>

        <Button
          className="w-full bg-[#1569EF] !font-normal !text-white hover:bg-gray-300 disabled:bg-gray-300"
          disabled={otp.some(data => data === "")}
          onClick={() => setStep(step + 1)}
          size="lg"
        >
          Confirm OTP Code
        </Button>
      </div>
    )
  );
}

export function RegisterSuccess({
  step,
  setIsDialogOpen,
}: {
  step: number;
  setIsDialogOpen: (value: boolean) => void;
}) {
  return (
    step === 4 && (
      <div className="flex min-h-screen items-center justify-center p-4">
        <Card className="w-full max-w-md space-y-6 p-6 text-center">
          <div className="flex justify-center">
            <CheckCircle className="size-16 text-green-500" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold tracking-tight">Registration Successful!</h1>
            <p className="text-muted-foreground">
              Your account has been created successfully. You can now log in to access your account.
            </p>
          </div>
          <Button className="w-full" onClick={() => setIsDialogOpen(true)} size="lg">
            Set Up Organization
          </Button>
        </Card>
      </div>
    )
  );
}
