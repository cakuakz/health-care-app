import { PageHeader } from "@/components/layouts/header";
import ProviderNetworkClient from "./_components/client";

export default function ProviderNetworkPage() {
  const breadcrumbs = [
    { title: "Dashboard", link: "/" },
    { title: "All Queue", link: "/referrals" },
  ];

  return (
    <>
      <PageHeader />
      <ProviderNetworkClient />
    </>
  );
}
