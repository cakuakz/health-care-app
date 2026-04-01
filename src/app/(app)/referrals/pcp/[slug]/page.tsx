"use client";

import { PageHeader } from "@/components/layouts/header";
import { formatSlug } from "@/lib/utils";
import { usePathname } from "next/navigation";
import PcpReferralClient from "../client";

export default function PcpReferralsPage() {
  const pathname = usePathname();

  const slug = pathname?.split("/").filter(Boolean).pop();

  const breadcrumbs = [
    { title: "Dashboard", link: "/" },
    { title: "Referrals", link: "/referrals" },
    { title: formatSlug(slug), link: `/referrals/${slug ?? ""}` },
  ];

  return (
    <>
      <PageHeader />
      <PcpReferralClient />
    </>
  );
}
