"use client";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useSidebar } from "@/components/ui/sidebar";
import { signOut } from "@/lib/auth-client";
import { ChevronsUpDown, LogOut } from "lucide-react";
import Image from "next/image";

export default function ProfileBox({ session }: { session: any }) {
  const { state } = useSidebar();
  const isExpanded = state === "expanded";

  return (
    <div className="flex cursor-pointer items-center space-x-4 rounded-xl border border-[#DFE1E6] bg-white p-[10px] shadow-[0_3px_6px_-2px_rgba(20,21,26,0.05),0_10px_16px_-3px_rgba(20,21,26,0.08)]">
      <div className="flex items-center space-x-2">
        <Image
          src="./img/profile-pict-calendar.svg"
          alt="Profile Picture"
          width={34}
          height={34}
          className="rounded-lg border border-[#FFFFFF4D]/30"
        />
        {isExpanded && (
          <div className="flex flex-col justify-between py-[3px]">
            <span className="font-medium">{session?.user?.name}</span>
            <span className="text-sm text-muted-foreground">{session?.user?.email}</span>
          </div>
        )}
      </div>

      {isExpanded && (
        <Popover>
          <PopoverTrigger asChild>
            <button className="rounded p-0.5 transition-colors hover:bg-gray-100">
              <ChevronsUpDown className="size-4" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-40 p-1" align="end">
            <button
              onClick={() => signOut()}
              className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-red-600 transition-colors hover:bg-red-50"
            >
              <LogOut className="size-4" />
              Logout
            </button>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
}
