"use client";

import { PageHeader } from "@/components/layouts/header";
import MainContainer from "@/components/layouts/main-container";
import { Badge } from "@/components/ui/badge";
import { DashboardCardData } from "@/constant/mock/dashboard-card-data";
import { MedicalCardMockData } from "@/constant/mock/medical-card";
import { createMedicalColumns } from "@/constant/mock/table-data";
import type { MedicalCardTypes } from "@/constant/types/referral";
import { useOnboarding } from "@/hooks/use-onboarding";
import { CircleCheck } from "lucide-react";
import { useState } from "react";
import IncomingSection from "../../referrals/_components/incoming/incoming-section";
import { ReusableTable } from "../../referrals/_components/list/list-table";
import ChartSection from "./chart-section";
import DashboardCardSection, { DashboardCardProps } from "./dashboard-card-section";
import DashboardShortcuts from "./dashboard-shortcuts";
import OnboardingProgressBox from "@/components/onboarding/progress-box";
import StepBoxContainer from "@/components/onboarding/step-box-container";
import MainButton from "@/components/button";

export default function DashboardClient() {
  const [cardPropsArray, setCardPropsArray] = useState<MedicalCardTypes[]>(MedicalCardMockData);
  const [cardSection, setCardSection] = useState<DashboardCardProps[]>(DashboardCardData);
  const [tableTitle, setTableTitle] = useState<string>("");
  const [tableContent, setTableContent] = useState<JSX.Element | null>(null);
  const [progress, setProgress] = useState([0]);
  const timeout = 1500;
  const { isOnboarded } = useOnboarding({
    onboarding_key: "isDashboardOnboarded",
    progress,
    isTimeout: true,
    timeout,
  });

  const breadcrumbs = [{ title: "Dashboard", link: "/dashboard" }];

  const mockData = [
    {
      step: 1,
      classnamePosition: "absolute top-52 left-24 z-50",
      description: "This list provides a quick preview of the data you have selected.",
    },
    {
      step: 2,
      classnamePosition: "absolute bottom-4 left-48 z-50",
      description:
        'The "Shortcut" lists lets you select another list to provides a quick preview of the data',
    },
    {
      step: 3,
      classnamePosition: "absolute top-80 left-96 z-50",
      description:
        "This section provides you the quick analysis of the application flow in the format of chart that you can filter",
    },
  ];

  const updateAssignTo = (id: string, newAssignTo: string) => {
    setCardPropsArray(prev =>
      prev.map(card => (card.id === id ? { ...card, assign_to: newAssignTo } : card))
    );
  };

  const unassignCard = (id: string) => {
    setCardPropsArray(prev =>
      prev.map(card => (id === card.id ? { ...card, assign_to: "" } : card))
    );
  };

  const addShortcut = (label: string) => {
    setCardSection(prevData => [
      ...prevData,
      { title: label, icon: <CircleCheck className="size-3 text-[#1757F7]" />, amount: 3 },
    ]);
  };

  const tableColumn = createMedicalColumns(() => console.log("test"), updateAssignTo, unassignCard);

  const handleTableChange = (title: string) => {
    setTableTitle(title);

    let content: JSX.Element;
    if (title === "Incoming Order") {
      content = <IncomingSection />;
    } else if (title === "") {
      content = <div />;
    } else {
      content = <ReusableTable columns={tableColumn} data={cardPropsArray} />;
    }

    setTableContent(content);
  };

  return (
    <>
      {!isOnboarded && (
        <div className="pointer-events-auto fixed inset-0 z-40 bg-black opacity-75" />
      )}
      <PageHeader />
      <MainContainer>
        {!isOnboarded && (
          <>
            <div className="fixed bottom-5 right-5 z-50">
              <OnboardingProgressBox progress={progress} timeout={timeout} />
            </div>

            <StepBoxContainer setProgress={setProgress} stepbox_property={mockData} />
          </>
        )}
        <div className="mb-4 flex size-full space-x-2">
          <div className="flex min-h-max max-w-[300px] flex-col space-y-5">
            <DashboardCardSection data={cardSection} onClick={title => handleTableChange(title)} />
            <DashboardShortcuts onAddShortcut={label => addShortcut(label)} />
          </div>
          <ChartSection />
        </div>
        <div className="rounded-lg border border-border">
          <div className="sticky top-0 z-20 m-3 flex gap-2 rounded-lg bg-[#F6F7FA] px-3 py-2">
            <span className="w-1.5 rounded-lg bg-[#FF5B5B]" />
            <div className="flex items-center space-x-2">
              <span className="capitalize">
                {tableTitle === "" ? "No Section Made" : tableTitle}
              </span>
              <Badge className={`${tableTitle === "" ? "hidden" : "flex"} rounded-lg px-1.5`}>
                {MedicalCardMockData.length}
              </Badge>
            </div>
          </div>
          {tableContent}
        </div>
      </MainContainer>
    </>
  );
}
