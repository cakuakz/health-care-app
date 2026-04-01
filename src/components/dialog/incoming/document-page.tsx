"use client";

import {
  AlignVerticalSpaceBetween,
  Check,
  ChevronLeft,
  ChevronRight,
  CopySlash,
  FileCheck2,
  Plus,
  Trash,
  WandSparkles,
} from "lucide-react";
import { useEffect, useState } from "react";

import { DatePicker } from "@/components/date-picker";
import FormProvider from "@/components/hook-form-provider";
import CustomFormInput from "@/components/input/custom-form-input";
import { PageHeader } from "@/components/layouts/header";
import MainContainer from "@/components/layouts/main-container";
import CustomFormSelect from "@/components/select/custom-form-select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { DocumentParseSchema, DocumentParseSchemaType } from "@/schema/document-parse";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import SuccessDialog from "../success-dialog";

export default function IncomingDocumentPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  // const [search, setSearch] = useState("");
  // const [isOpen, setIsOpen] = useState(false);
  const totalPages = 6;

  // const [availableCodes, setAvailableCodes] = useState<ProcedureCode[]>([
  //   {
  //     code: "99204",
  //     description: "New Patient, Moderate Complexity Visit",
  //     quantity: 1,
  //     dateRange: {
  //       from: new Date(2024, 11, 5),
  //       to: new Date(2025, 2, 5),
  //     },
  //   },
  //   {
  //     code: "99214",
  //     description: "Established Patient, Moderate Complexity Visit",
  //     quantity: 1,
  //     dateRange: {
  //       from: new Date(2024, 11, 5),
  //       to: new Date(2025, 2, 5),
  //     },
  //   },
  //   {
  //     code: "99202",
  //     description: "New Patient, Straightforward Visit",
  //     quantity: 1,
  //     dateRange: {
  //       from: new Date(2024, 11, 5),
  //       to: new Date(2025, 2, 5),
  //     },
  //   },
  //   {
  //     code: "99205",
  //     description: "New Patient, High Complexity Visit",
  //     quantity: 1,
  //     dateRange: {
  //       from: new Date(2024, 11, 5),
  //       to: new Date(2025, 2, 5),
  //     },
  //   },
  //   {
  //     code: "99211",
  //     description: "Established Patient, Minimal Visit",
  //     quantity: 1,
  //     dateRange: {
  //       from: new Date(2024, 11, 5),
  //       to: new Date(2025, 2, 5),
  //     },
  //   },
  // ]);

  const breadcrumbs = [
    { title: "Dashboard", link: "/" },
    { title: "Referrals", link: "/referrals" },
  ];

  const methods = useForm<DocumentParseSchemaType>({
    resolver: zodResolver(DocumentParseSchema),
    mode: "onChange",
    defaultValues: {
      organization: {
        name: "",
        speciality: "",
        address: "",
        npi_code: "",
        phone: "",
        fax: "",
        email: "",
      },
      summary: "",
      patient_info: {
        full_name: "",
        date_of_birth: new Date(),
        member_id: "",
      },
      insurance_info: {
        insurance: "",
        request_type: "",
        relation_to_subscribe: "",
      },
      generalist: {
        provider_name: "",
        speciality: "",
        npi_code: "",
      },
      specialist: {
        provider_name: "",
        speciality: "",
        npi_code: "",
      },
      diagnosis: [{ icdCode: "", description: "" }],
      procedures: [
        {
          cptCode: "",
          description: "",
          type: "",
          fromDate: new Date(),
          toDate: new Date(),
          qty: "",
          qtyType: "",
        },
      ],
      serviceInfo: {
        placeOfService: "",
        serviceType: "",
        fromDate: new Date(),
        toDate: new Date(),
        qty: "",
        qtyType: "",
      },
      visitDetails: {
        numberOfVisits: "",
        appointmentDate: new Date(),
      },
    },
  });

  const {
    control,
    formState: { errors, isValid, isSubmitting },
  } = methods;

  const {
    fields: diagnosisFields,
    append: appendDiagnosis,
    remove: removeDiagnosis,
  } = useFieldArray({
    control: control,
    name: "diagnosis",
  });

  const {
    fields: procedureFields,
    append: appendProcedure,
    remove: removeProcedure,
  } = useFieldArray({
    control: control,
    name: "procedures",
  });

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
    router.back();
  };

  const onSubmit = (data: DocumentParseSchemaType) => {
    console.log("Form Data", data);
    setShowSuccessDialog(true);
  };

  useEffect(() => {
    toast({
      color: "#E9F7EF",
      className: "bg-[#E7F6EC] border-0",
      duration: 2000,
      description: (
        <div className="flex items-center gap-2 text-[#0E844E]">
          <Check className="size-5" />
          <span className="font-medium">Parsing Completed!</span>
        </div>
      ),
    });
  }, [toast]);

  return (
    <>
      <SuccessDialog onClose={handleCloseSuccessModal} open={showSuccessDialog} />
      <PageHeader />
      <MainContainer className="flex h-screen !bg-white !pl-0 !pr-7">
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

        <div className="mr-3 flex flex-1 flex-col rounded-2xl bg-secondary p-3">
          <ScrollArea className="h-full flex-1 overflow-y-auto rounded-2xl pr-4">
            <Image
              alt="File Picture"
              className="size-full"
              height={812}
              src="/img/pdf_example.svg"
              width={587}
            />

            {/* Button Section */}
            <div className="sticky bottom-4 mx-auto mt-2 flex w-full max-w-[586px] items-center justify-between rounded-lg border border-border bg-white p-3 shadow-md">
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

              <div className="flex items-center space-x-3">
                <Button variant="outline">Download</Button>
                <Button variant="default">
                  <WandSparkles />
                  Parsing Fax
                </Button>
              </div>
            </div>
          </ScrollArea>
        </div>

        <div className="flex-1 flex-col rounded-2xl border border-border bg-white p-4">
          <ScrollArea className="h-full flex-1 pr-4">
            {/* Title */}
            <div className="mb-6 flex items-end justify-between">
              <div className="flex flex-col space-y-1">
                <h1 className="text-base font-semibold">Parsed Data</h1>
                <p className="text-sm font-normal">Lorem ipsum dolor sit amet consectetur.</p>
              </div>
            </div>

            <FormProvider methods={methods} onSubmit={onSubmit}>
              {/* Organization Section */}
              <div className="flex flex-col space-y-3">
                <p className="text-sm font-semibold">Organization Info</p>
                <div className="flex items-center space-x-3">
                  <CustomFormInput
                    error={errors.organization?.name?.message}
                    label="Organization Name"
                    name="organization.name"
                    placeholder="Enter Organization Name"
                  />
                  <CustomFormInput
                    error={errors.organization?.speciality?.message}
                    label="Speciality"
                    name="organization.speciality"
                    placeholder="Enter Speciality"
                  />
                </div>
                <div className="flex">
                  <CustomFormInput
                    error={errors.organization?.address?.message}
                    label="Address"
                    name="organization.address"
                    placeholder="Enter Address"
                  />
                </div>
                <div className="flex items-center space-x-3">
                  <CustomFormInput
                    error={errors.organization?.npi_code?.message}
                    label="NPI"
                    name="organization.npi_code"
                    placeholder="Enter NPI"
                    type="number"
                  />
                  <CustomFormInput
                    error={errors.organization?.phone?.message}
                    label="Phone"
                    name="organization.phone"
                    placeholder="Enter Phone Number"
                    type="number"
                  />
                </div>
                <div className="flex items-center space-x-3">
                  <CustomFormInput
                    error={errors.organization?.fax?.message}
                    label="Fax"
                    name="organization.fax"
                    placeholder="Enter Fax"
                    type="number"
                  />
                  <CustomFormInput
                    error={errors.organization?.email?.message}
                    label="Contact Info"
                    name="organization.email"
                    placeholder="Email"
                  />
                </div>
              </div>

              {/* Summary Section */}
              <div className="mt-5 flex flex-col space-y-3">
                <p className="text-sm font-semibold">Summary</p>
                <div className="flex flex-col space-y-1">
                  <Label className="!text-xs font-medium text-gray-700" htmlFor="message">
                    Your Sumarry
                  </Label>
                  <Controller
                    control={control}
                    name="summary"
                    render={({ field }) => (
                      <Textarea {...field} id="message" placeholder="Type your message here." />
                    )}
                  />
                </div>
              </div>

              {/* Patient & Insurance Info */}
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {/* Patient Section */}
                <div className="flex flex-col space-y-3">
                  <p className="text-sm font-semibold">Patient Info</p>
                  <div className="flex flex-col space-y-2 rounded-lg border border-border p-3">
                    <CustomFormInput
                      error={errors.patient_info?.full_name?.message}
                      label="Patient Full Name"
                      name="patient_info.full_name"
                      placeholder="Enter Name"
                    />
                    <Controller
                      control={control}
                      name="patient_info.date_of_birth"
                      render={({ field }) => (
                        <div className="flex flex-col space-y-1">
                          <p className="text-xs font-medium text-gray-700">DOB</p>
                          <DatePicker onSelect={field.onChange} selected={field.value} />
                        </div>
                      )}
                    />
                    <CustomFormInput
                      error={errors.patient_info?.member_id?.message}
                      label="Member ID"
                      name="patient_info.member_id"
                      placeholder="Enter Member ID"
                    />
                  </div>
                </div>

                {/* Insurance Section */}
                <div className="flex flex-col space-y-3">
                  <p className="text-sm font-semibold">Insurance Info</p>
                  <div className="flex flex-col space-y-2 rounded-lg border border-border p-3">
                    <CustomFormSelect
                      error={errors.insurance_info?.insurance?.message}
                      label="Insurance"
                      name="insurance_info.insurance"
                      options={[
                        { label: "Property", value: "property" },
                        { label: "Life", value: "life" },
                        { label: "Education", value: "education" },
                      ]}
                      placeholder="Choose Insurance"
                    />
                    <CustomFormSelect
                      error={errors.insurance_info?.request_type?.message}
                      label="Request Type"
                      name="insurance_info.request_type"
                      options={[
                        { label: "Insurance Application", value: "application" },
                        { label: "Insurance Claim", value: "claim" },
                      ]}
                      placeholder="Choose Request Type"
                    />
                    <CustomFormSelect
                      error={errors.insurance_info?.relation_to_subscribe?.message}
                      label="Relation to Subscriber"
                      name="insurance_info.relation_to_subscribe"
                      options={[
                        { label: "Father", value: "father" },
                        { label: "Mother", value: "mother" },
                        { label: "Siblings", value: "siblings" },
                        { label: "Spouse", value: "spouse" },
                      ]}
                      placeholder="Choose Relation"
                    />
                  </div>
                </div>
              </div>

              {/* Specialist & Generalist Section */}
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {/* Specialist Section */}
                <div className="flex flex-col space-y-3">
                  <p className="text-sm font-semibold">From Specialist</p>
                  <div className="flex flex-col space-y-2 rounded-lg border border-border p-3">
                    <CustomFormInput
                      error={errors.specialist?.provider_name?.message}
                      label="Provider Name"
                      name="specialist.provider_name"
                      placeholder="Enter Provider Name"
                    />
                    <CustomFormInput
                      error={errors.specialist?.speciality?.message}
                      label="Speciality"
                      name="specialist.speciality"
                      placeholder="Enter Speciality"
                    />
                    <CustomFormInput
                      error={errors.specialist?.npi_code?.message}
                      label="NPI"
                      name="specialist.npi_code"
                      placeholder="Enter NPI"
                      type="number"
                    />
                  </div>
                </div>

                {/* Generalist Section */}
                <div className="flex flex-col space-y-3">
                  <p className="text-sm font-semibold">To Generalist</p>
                  <div className="flex flex-col space-y-2 rounded-lg border border-border p-3">
                    <CustomFormInput
                      error={errors.generalist?.provider_name?.message}
                      label="Provider Name"
                      name="generalist.provider_name"
                      placeholder="Enter Provider Name"
                    />
                    <CustomFormInput
                      error={errors.generalist?.speciality?.message}
                      label="Speciality"
                      name="generalist.speciality"
                      placeholder="Enter Speciality"
                    />
                    <CustomFormInput
                      error={errors.generalist?.npi_code?.message}
                      label="NPI"
                      name="generalist.npi_code"
                      placeholder="Enter NPI"
                      type="number"
                    />
                  </div>
                </div>
              </div>

              {/* Diagnosis Section */}
              <div className="mt-5 flex flex-col space-y-3">
                <p className="text-sm font-semibold">Diagnosis</p>
                {diagnosisFields.map((field, index) => (
                  <div
                    className="flex items-end space-x-4 rounded-lg border border-border p-3"
                    key={field.id}
                  >
                    <CustomFormSelect
                      label={`ICD Code #${index + 1}`}
                      name={`diagnosis.${index}.icdCode`}
                      options={[
                        { label: "ICD-10-CM", value: "ICD-10-CM" },
                        { label: "ICD-10-PCS", value: "ICD-10-PCS" },
                        { label: "ICD-11", value: "ICD-11" },
                      ]}
                      placeholder="Choose ICD"
                    />
                    <CustomFormInput
                      label={`ICD Code #${index + 1} Description`}
                      name={`diagnosis.${index}.description`}
                      placeholder="ICD Description"
                    />
                    <Button
                      className="p-4"
                      disabled={index === 0}
                      onClick={() => removeDiagnosis(index)}
                      size="icon"
                      type="button"
                    >
                      <Trash />
                    </Button>
                  </div>
                ))}
                <Button
                  className="size-fit self-end !border-blue-600 !px-3 !py-2 text-blue-600"
                  onClick={() => {
                    appendDiagnosis({ icdCode: "", description: "" });
                  }}
                  type="button"
                  variant="outline"
                >
                  <Plus className="size-4 text-blue-600" />
                  Add More ICD
                </Button>
              </div>

              {/* Procedure Section */}
              <div className="mt-5 flex flex-col space-y-3">
                <p className="text-sm font-semibold">Procedure</p>
                {procedureFields.map((field, index) => (
                  <div
                    className="flex flex-col space-y-3 rounded-lg border border-border p-3"
                    key={field.id}
                  >
                    <div className="flex items-center space-x-3">
                      <CustomFormSelect
                        label={`CPT Code #${index + 1}`}
                        name={`procedures.${index}.cptCode`}
                        options={[
                          { label: "99213", value: "99213" },
                          { label: "93000", value: "93000" },
                          { label: "90471", value: "90471" },
                        ]}
                        placeholder="Choose CPT"
                      />
                      <CustomFormInput
                        label={`CPT Code #${index + 1} Description`}
                        name={`procedures.${index}.description`}
                        placeholder="CPT Description"
                      />
                    </div>
                    <div className="flex items-center space-x-3">
                      <CustomFormSelect
                        label="Type"
                        name={`procedures.${index}.type`}
                        options={[
                          { label: "Anesthesiology", value: "anesthesiology" },
                          { label: "Surgery", value: "surgery" },
                          { label: "Radiology", value: "radiology" },
                        ]}
                        placeholder="Choose Type"
                      />
                      <Controller
                        control={control}
                        name={`procedures.${index}.fromDate`}
                        render={({ field }) => (
                          <div className="flex flex-col space-y-1">
                            <p className="text-xs font-medium text-gray-700">From Date</p>
                            <DatePicker onSelect={field.onChange} selected={field.value} />
                          </div>
                        )}
                      />
                      <Controller
                        control={control}
                        name={`procedures.${index}.toDate`}
                        render={({ field }) => (
                          <div className="flex flex-col space-y-1">
                            <p className="text-xs font-medium text-gray-700">To Date</p>
                            <DatePicker onSelect={field.onChange} selected={field.value} />
                          </div>
                        )}
                      />
                    </div>
                    <div className="flex items-center space-x-3">
                      <CustomFormInput
                        label="Qty"
                        name={`procedures.${index}.qty`}
                        placeholder="Enter Qty"
                      />
                      <CustomFormSelect
                        label="Qty Type"
                        name={`procedures.${index}.qtyType`}
                        options={[
                          { label: "Anesthesiology", value: "anesthesiology" },
                          { label: "Surgery", value: "surgery" },
                          { label: "Radiology", value: "radiology" },
                        ]}
                        placeholder="Choose Qty Type"
                      />
                    </div>
                    <Button
                      className="self-end p-4"
                      disabled={index === 0}
                      onClick={() => removeProcedure(index)}
                      size="icon"
                      type="button"
                    >
                      <Trash />
                    </Button>
                  </div>
                ))}
                <Button
                  className="size-fit self-end !border-blue-600 !px-3 !py-2 text-blue-600"
                  onClick={() => {
                    appendProcedure({
                      cptCode: "",
                      description: "",
                      type: "",
                      fromDate: new Date(),
                      toDate: new Date(),
                      qty: "",
                      qtyType: "",
                    });
                  }}
                  type="button"
                  variant="outline"
                >
                  <Plus className="size-4 text-blue-600" />
                  Add More CPT
                </Button>
              </div>

              {/* Service Info Section */}
              <div className="mt-5 flex flex-col space-y-3">
                <p className="text-sm font-semibold">Service Info</p>
                <div className="grid gap-3 md:grid-cols-2">
                  <CustomFormSelect
                    error={errors.serviceInfo?.placeOfService?.message}
                    label="Place of Service"
                    name="serviceInfo.placeOfService"
                    options={[
                      { label: "Hospital", value: "hospital" },
                      { label: "Provider Care", value: "provider_care" },
                    ]}
                    placeholder="Choose Place"
                  />
                  <CustomFormSelect
                    error={errors.serviceInfo?.serviceType?.message}
                    label="Type"
                    name="serviceInfo.serviceType"
                    options={[
                      { label: "Service 1", value: "service1" },
                      { label: "Service 2", value: "service2" },
                    ]}
                    placeholder="Choose Type"
                  />
                  <Controller
                    control={control}
                    name="serviceInfo.fromDate"
                    render={({ field }) => (
                      <div className="flex flex-col space-y-1">
                        <p className="text-xs font-medium text-gray-700">From Date</p>
                        <DatePicker onSelect={field.onChange} selected={field.value} />
                      </div>
                    )}
                  />
                  <Controller
                    control={control}
                    name="serviceInfo.toDate"
                    render={({ field }) => (
                      <div className="flex flex-col space-y-1">
                        <p className="text-xs font-medium text-gray-700">To Date</p>
                        <DatePicker onSelect={field.onChange} selected={field.value} />
                      </div>
                    )}
                  />
                  <CustomFormInput
                    error={errors.serviceInfo?.qty?.message}
                    label="Qty"
                    name="serviceInfo.qty"
                    placeholder="Enter Qty"
                  />
                  <CustomFormSelect
                    label="Qty Type"
                    name="serviceInfo.qtyType"
                    options={[
                      { label: "Anesthesiology", value: "anesthesiology" },
                      { label: "Surgery", value: "surgery" },
                      { label: "Radiology", value: "radiology" },
                    ]}
                    placeholder="Choose Qty Type"
                  />
                </div>
              </div>

              {/* Visit Details Section */}
              <div className="mt-5 flex flex-col space-y-3">
                <p className="text-sm font-semibold">Service Info</p>
                <div className="grid gap-3 md:grid-cols-2">
                  <CustomFormInput
                    error={errors.visitDetails?.numberOfVisits?.message}
                    label="Number of Visits"
                    name="visitDetails.numberOfVisits"
                    placeholder="Enter Number of Visits"
                  />
                  <Controller
                    control={control}
                    name="visitDetails.appointmentDate"
                    render={({ field }) => (
                      <div className="flex flex-col space-y-1">
                        <p className="text-xs font-medium text-gray-700">Appointment Date</p>
                        <DatePicker onSelect={field.onChange} selected={field.value} />
                      </div>
                    )}
                  />
                </div>
              </div>

              {/* Button Section */}
              <div className="sticky bottom-2 mx-5 mt-4 flex max-w-[650px] items-center space-x-2 rounded-lg border border-border bg-white p-3 shadow-md">
                <Button
                  className="!hover:bg-white flex-1 !border border-border !bg-white !text-muted-foreground"
                  type="button"
                >
                  Retry Parsing <AlignVerticalSpaceBetween />
                </Button>
                <Button
                  className="!hover:bg-white flex-1 !border border-border !bg-white !text-muted-foreground"
                  type="button"
                >
                  Auto Match <CopySlash />
                </Button>
                <Button
                  className="!hover:bg-white flex-1 !border border-border !bg-white !text-muted-foreground"
                  type="button"
                >
                  Add Quote <WandSparkles />
                </Button>
                <Button
                  className="flex-1"
                  disabled={!isValid || isSubmitting}
                  type="submit"
                  variant="default"
                >
                  Submit <FileCheck2 />
                </Button>
              </div>
            </FormProvider>
            <ScrollBar orientation="vertical" />
          </ScrollArea>
        </div>
      </MainContainer>
    </>
  );
}
