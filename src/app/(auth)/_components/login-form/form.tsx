"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "@/lib/auth-client";
import Image from "next/image";

export default function UserLoginForm() {
  const handleGoogleSignIn = async () => {
    await signIn.social({
      provider: "google",
      callbackURL: "/dashboard",
    });
  };

  return (
    <div>
      <Button
        className="flex w-full items-center justify-center gap-2 text-base !text-[#606060]"
        type="button"
        variant="outline"
        onClick={handleGoogleSignIn}
      >
        <Image alt="Google Icon" height={24} src="/img/icons-google.svg" width={24} />
        Google
      </Button>
    </div>
  );
}
