"use client";

import FormProvider from "@/components/hook-form-provider";
import CustomFormInput from "@/components/input/custom-form-input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { signIn } from "@/lib/auth-client";
import { UserLoginSchema, UserLoginSchemaType } from "@/schema/login";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function UserLoginForm() {
  const router = useRouter();
  const methods = useForm<UserLoginSchemaType>({
    resolver: zodResolver(UserLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    formState: { errors },
  } = methods;

  const onSubmit = (data: UserLoginSchemaType) => {
    console.log("Form Submitted:", data);
    router.push("/");
  };

  const handleGoogleSignIn = async () => {
    await signIn.social({
      provider: "google",
      callbackURL: "/dashboard",
    });
  };

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <div className="space-y-4">
        <CustomFormInput
          error={errors.email?.message}
          label="Email"
          name="email"
          placeholder="Email"
        />
        <CustomFormInput
          error={errors.password?.message}
          label="Password"
          name="password"
          placeholder="Password"
          type="password"
        />
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Checkbox id="rememberMe" name="rememberMe" />
          <label className="text-sm text-gray-500" htmlFor="rememberMe">
            Remind me
          </label>
        </div>
        <Link className="text-sm text-blue-500 hover:underline" href="/forgot-password">
          Forgot the password?
        </Link>
      </div>

      <Button className="mt-6 w-full bg-gray-200 text-gray-800 hover:bg-gray-300" type="submit">
        Sign In
      </Button>

      <div className="mt-6 text-center">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500">or sign in with</span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <Button
            className="flex items-center justify-center gap-2 text-base !text-[#606060]"
            type="button"
            variant="outline"
            onClick={handleGoogleSignIn}
          >
            <Image alt="Google Icon" height={24} src="/img/icons-google.svg" width={24} />
            Google
          </Button>
          <Button
            className="flex items-center justify-center gap-2 text-base !text-[#606060]"
            type="button"
            variant="outline"
          >
            <Image alt="Facebook Icon" height={24} src="/img/icons-facebook.svg" width={24} />
            Facebook
          </Button>
        </div>
      </div>

      <p className="mt-6 text-center text-sm text-gray-500">
        Don&apos;t have account yet?{" "}
        <Link className="text-blue-500 hover:underline" href="/register">
          Sign Up
        </Link>
      </p>
    </FormProvider>
  );
}
