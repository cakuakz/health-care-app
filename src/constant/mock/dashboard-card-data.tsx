import type { DashboardCardProps } from "@/app/(app)/dashboard/_components/dashboard-card-section";
import { CircleCheck } from "lucide-react";

export const DashboardCardData: DashboardCardProps[] = [
  { title: "STAT & Urgent", icon: <CircleCheck className="size-3 text-[#1757F7]" />, amount: 3 },
  { title: "Auto Approved", icon: <CircleCheck className="size-3 text-[#1757F7]" />, amount: 3 },
  { title: "Incoming Order", icon: <CircleCheck className="size-3 text-[#1757F7]" />, amount: 3 },
  {
    title: "Orders to Schedule",
    icon: <CircleCheck className="size-3 text-[#1757F7]" />,
    amount: 3,
  },
  {
    title: "Orders to Submit",
    icon: <CircleCheck className="size-3 text-[#1757F7]" />,
    amount: 10,
  },
  { title: "Chats to Answer", icon: <CircleCheck className="size-3 text-[#1757F7]" />, amount: 6 },
  { title: "Saved Orders", icon: <CircleCheck className="size-3 text-[#1757F7]" />, amount: 3 },
  {
    title: "Orders to Resubmit",
    icon: <CircleCheck className="size-3 text-[#1757F7]" />,
    amount: 3,
  },
];
