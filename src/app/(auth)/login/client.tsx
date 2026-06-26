"use client";

import Link from "next/link";
import UserLoginForm from "../_components/login-form/form";
import Image from "next/image";

export default function LoginClient() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-evenly">
      <div className="flex flex-col items-center pt-20">
        <span className="mb-6 rounded-lg">
          <Image
            src="/img/hoskit-logo-v2.svg"
            alt="Hoskit Logo"
            width={83}
            height={83}
            style={{ marginTop: "6px" }}
          />
        </span>
        <h1 className="mb-3 text-2xl font-medium">Welcome to Hoskit!</h1>
        <p className="mb-10 max-w-72 text-center text-sm font-normal">
          Enter your email and password from your Google account to access your Hoskit dashboard.
        </p>
        <div className="px-28">
          <UserLoginForm />
        </div>
      </div>

      <footer className="flex w-full items-center justify-between p-4 pt-32 text-[10px] text-gray-500">
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
  );
}
