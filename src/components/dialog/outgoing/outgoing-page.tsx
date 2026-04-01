"use client";

import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";
import { useState } from "react";

import { FileUploader } from "@/components/file-uploader";
import { PageHeader } from "@/components/layouts/header";
import MainContainer from "@/components/layouts/main-container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import SuccessDialog from "../success-dialog";

const data = [
  {
    label: "Address",
    value: "Louisville, KY 40202",
  },
  {
    label: "Provider Name",
    value: "Dr. Anne Williams",
  },
  {
    label: "Fax Number",
    value: "123-456-7890",
  },
  {
    label: "Speciality",
    value: "2070000X",
  },
  {
    label: "NPI",
    value: "1234567890",
  },
];

export default function OutgoingDocumentPage() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [scale, setScale] = useState(1); // Zoom scale state

  const [files, setFiles] = useState<File[]>(() => {
    const dummyFiles = [
      new File(["This is a Dummy PDF File Data."], "Document1.pdf", { type: "application/pdf" }),
      new File(["This is a Dummy PDF File Data."], "Document2.pdf", { type: "application/pdf" }),
    ];

    return dummyFiles.map(file =>
      Object.assign(file, {
        preview: URL.createObjectURL(file), // Add the preview property!
      })
    );
  });
  const totalPages = 6;

  const breadcrumbs = [
    { title: "Dashboard", link: "/" },
    { title: "Referrals", link: "/referrals" },
  ];

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessDialog(false);
    router.replace("/efax");
  };

  // Zoom Functions
  const zoomIn = () => {
    setScale(prev => Math.min(prev + 0.1, 3)); // Limit max zoom to 3x
  };

  const zoomOut = () => {
    setScale(prev => Math.max(prev - 0.1, 0.5)); // Limit min zoom to 0.5x
  };

  return (
    <>
      <SuccessDialog onClose={handleCloseSuccessModal} open={showSuccessDialog} />
      <PageHeader />
      <MainContainer className="flex h-screen !bg-white !pl-0 !pr-7">
        {/* Thumbnail Navigation */}
        <div className="flex w-24 flex-col items-center overflow-y-auto py-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              className="mb-8 flex h-20 w-14 items-center justify-center text-xs font-medium"
              key={index}
              onClick={() => goToPage(index + 1)}
            >
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "mb-1 flex h-16 w-12 items-center justify-center overflow-hidden rounded border bg-white transition-colors",
                    currentPage === index + 1
                      ? "border-primary bg-primary/10"
                      : "border-border hover:bg-muted"
                  )}
                >
                  <Image alt="File Thumbnail" height={100} src="/img/pdf_example.svg" width={78} />
                </div>
                {index + 1}
              </div>
            </button>
          ))}
        </div>

        {/* Main Preview Area */}
        <div className="mr-3 flex flex-1 flex-col rounded-2xl bg-secondary p-3">
          <ScrollArea className="h-full flex-1 overflow-y-auto rounded-2xl pr-4">
            <div
              className="flex items-center justify-center"
              style={{
                transform: `scale(${scale})`,
                transformOrigin: "center",
                transition: "transform 0.2s ease-in-out",
              }}
            >
              <Image
                alt="File Picture"
                className="size-full"
                height={812}
                src="/img/pdf_example.svg"
                width={587}
              />
            </div>

            {/* Pagination & Zoom Controls */}
            <div className="sticky bottom-4 mx-auto mt-2 flex w-full max-w-[586px] items-center justify-between rounded-lg border border-border bg-white p-3 shadow-md">
              {/* Pagination */}
              <div className="flex items-center space-x-3">
                <Button
                  disabled={currentPage === 1}
                  onClick={prevPage}
                  size="icon"
                  variant="secondary"
                >
                  <ChevronLeft className="size-2" />
                </Button>
                <p className="text-center text-xs font-semibold">
                  Page {currentPage}/{totalPages}
                </p>
                <Button
                  disabled={currentPage === totalPages}
                  onClick={nextPage}
                  size="icon"
                  variant="secondary"
                >
                  <ChevronRight className="size-2" />
                </Button>
              </div>

              {/* Zoom Controls */}
              <div className="flex items-center space-x-3">
                <Button onClick={zoomOut} size="icon" variant="outline">
                  <ZoomOut className="size-4" />
                </Button>
                <Button onClick={zoomIn} size="icon" variant="default">
                  <ZoomIn className="size-4" />
                </Button>
              </div>
            </div>
          </ScrollArea>
        </div>

        {/* Right Panel */}
        <div className="flex-1 flex-col rounded-2xl border border-border bg-white px-5 py-4">
          <ScrollArea className="h-full flex-1 pr-4">
            <h1 className="mb-3 text-sm font-semibold">Recipient</h1>
            <div className="mb-4 flex flex-col space-y-4 border-l border-l-border pl-3">
              <div className="flex items-center space-x-2">
                <Image
                  alt="Lotus Clinic Logo"
                  height={24}
                  src="/img/lotus_clinic_example.svg"
                  width={24}
                />
                <p className="text-xs font-semibold">Lotus Clinic LLC</p>
              </div>
              {data.map(({ label, value }, index) => (
                <div className="flex items-center" key={index}>
                  <Label className="w-32 text-xs font-normal">{label}</Label>
                  <Badge className="!text-xs font-medium" variant="secondary">
                    {value}
                  </Badge>
                </div>
              ))}
            </div>

            <h1 className="mb-3 text-sm font-semibold">Document</h1>
            <FileUploader
              accept={{
                "application/pdf": [".pdf"],
                "application/msword": [".doc"],
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [
                  ".docx",
                ],
              }}
              maxFileCount={8}
              maxSize={8 * 1024 * 1024}
              onValueChange={setFiles}
              uploadedFilePosition="top"
              value={files}
            />
            <div className="mt-4 flex justify-end">
              <Button
                className="border border-[#4579F9] !bg-gradient-to-b from-[#3F76FF] to-[#1757F7]"
                onClick={() => setShowSuccessDialog(true)}
              >
                Send Fax
              </Button>
            </div>
            <ScrollBar orientation="vertical" />
          </ScrollArea>
        </div>
      </MainContainer>
    </>
  );
}
