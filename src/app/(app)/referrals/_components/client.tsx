"use client";

import { PageHeader } from "@/components/layouts/header";
import MainContainer from "@/components/layouts/main-container";
import OnboardingProgressBox from "@/components/onboarding/progress-box";
import StepBoxContainer from "@/components/onboarding/step-box-container";
import { Toaster } from "@/components/ui/toaster";
import { useHorizontalScroll } from "@/hooks/use-horizontal-scroll";
import { useOnboarding } from "@/hooks/use-onboarding";
import { useState } from "react";
import ReferralHeader from "./header/title";
import IncomingSection from "./incoming/incoming-section";
import KanbanReferral from "./kanban";
import ListReferral from "./list";
import ScrollHorizontalButton from "./ui/scroll-horizontal-button";

export default function ReferralClient() {
  const [queue, setQueue] = useState("all");
  const [view, setView] = useState("kanban");
  const [status, setStatus] = useState("outgoing");
  const [cardStatus, setCardStatus] = useState("all");
  const [progress, setProgress] = useState([0]);
  const timeout = 1500;
  const { isOnboarded } = useOnboarding({
    onboarding_key: "isReferralOnboarded",
    progress,
    isTimeout: true,
    timeout,
  });

  const { scrollContainerRef, scrollLeft, scrollRight } = useHorizontalScroll();

  const breadcrumbs = [
    { title: "Dashboard", link: "/" },
    { title: "Referrals", link: "/referrals" },
  ];

  const mockData = [
    {
      step: 1,
      classnamePosition: "absolute top-40 left-10 z-50",
      description:
        'This switch button allows you to filter your preferences for viewing the data. By default, it is set to "Kanban View", but it will change to "List View" when switched to the right.',
    },
    {
      step: 2,
      classnamePosition: "absolute top-40 left-28 z-50",
      description:
        'The "Queue Switch" button lets you filter referrals based on whether they have already been submitted and update their status from "New" or have not submitted yet.',
    },
    {
      step: 3,
      classnamePosition: "absolute top-40 left-96 z-50",
      description:
        'The "Draft" button lets you view drafted or unfinished referral submissions based on your last submission attempt.',
    },
    {
      step: 4,
      classnamePosition: "absolute top-40 left-[480px] z-50",
      description:
        'The "Status" selection button allows you to filter referrals based on their status, such as "New," "Pending," etc.',
    },
    {
      step: 5,
      classnamePosition: "absolute bottom-40 left-56 z-50",
      description:
        "Dummy description about the referral onboarding that explains about the referral card.",
    },
    {
      step: 6,
      classnamePosition: "absolute bottom-40 right-96 z-50",
      description:
        "Dummy description about the referral onboarding that explains about the referral card.",
    },
  ];

  return (
    <>
      {!isOnboarded && (
        <div className="pointer-events-auto fixed inset-0 z-40 bg-black opacity-75" />
      )}

      <ScrollHorizontalButton onClick={scrollLeft} position="left" />
      <ScrollHorizontalButton onClick={scrollRight} position="right" />

      <PageHeader />
      <MainContainer className="flex flex-col !p-0">
        {!isOnboarded && (
          <>
            <div className="fixed bottom-5 right-5 z-50">
              <OnboardingProgressBox progress={progress} timeout={timeout} />
            </div>

            <StepBoxContainer setProgress={setProgress} stepbox_property={mockData} />
          </>
        )}

        <Toaster />
        <ReferralHeader
          cardStatus={cardStatus}
          queue={queue}
          setCardStatus={setCardStatus}
          setQueue={setQueue}
          setStatus={setStatus}
          setView={setView}
          status={status}
          view={view}
        />
        <div className="no-scrollbar relative w-full overflow-x-auto" ref={scrollContainerRef}>
          <div className="flex w-full">
            {status === "outgoing" ? (
              <div className="w-max">
                <KanbanReferral queueFilter={queue} statusFilter={cardStatus} view={view} />
              </div>
            ) : (
              <IncomingSection />
            )}
            <ListReferral queueFilter={queue} statusFilter={cardStatus} view={view} />
          </div>
        </div>
      </MainContainer>
    </>
  );
}
