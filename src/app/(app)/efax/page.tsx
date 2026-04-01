import { PageHeader } from "@/components/layouts/header";
import EfaxClient from "./client";

export default function EfaxPage() {
  const breadcrumbs = [
    { title: "Dashboard", link: "/" },
    { title: "eFax", link: "/efax" },
  ];

  return (
    <>
      <PageHeader />
      <EfaxClient />
    </>
  );
}
