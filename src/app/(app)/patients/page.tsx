import { PageHeader } from "@/components/layouts/header";
import PatientClient from "./_components/client";

export default function PatientsPage() {
  const breadcrumbs = [
    { title: "Dashboard", link: "/" },
    { title: "All Queue", link: "/referrals" },
  ];

  return (
    <>
      <PageHeader />
      <PatientClient />
    </>
  );
}
