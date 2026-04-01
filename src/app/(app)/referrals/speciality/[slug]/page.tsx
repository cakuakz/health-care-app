"use client";

import { PageHeader } from "@/components/layouts/header";
import { formatSlug } from "@/lib/utils";
import { usePathname } from "next/navigation";
import SpecialityReferralClient from "../client";

export default function SpecialityReferralsPage() {
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
      <SpecialityReferralClient />
    </>
  );
}
