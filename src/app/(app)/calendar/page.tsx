import MainContainer from "@/components/layouts/main-container";
import React from "react";
import CalendarClient from "./client";
import { PageHeader } from "@/components/layouts/header";

export default function CalendarPage() {
  const breadcrumbs = [
    { title: "Dashboard", link: "/" },
    { title: "Calendar", link: "/calendar" },
  ];

  return (
    <MainContainer className="!p-0">
      <PageHeader />
      <CalendarClient />
    </MainContainer>
  );
}
