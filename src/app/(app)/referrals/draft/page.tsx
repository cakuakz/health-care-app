"use client";

import { PageHeader } from "@/components/layouts/header";
import ReferralDraftClient from "./client";

export default function PriorityReferralsPage() {
  const breadcrumbs = [
    { title: "Dashboard", link: "/" },
    { title: "Referrals", link: "/referrals" },
    { title: "Draft", link: "/referrals/draft" },
  ];

  return (
    <>
      <PageHeader />
      <ReferralDraftClient />
    </>
  );
}
