import { FieldErrors } from "react-hook-form";
import { UserAssignmentSchemaType } from "@/schema/assignment";

export type SelectOptionsProps = {
  label: string;
  value: string;
};

export type SelectProps = {
  options: SelectOptionsProps[];
  selectedOption: string;
  setSelectedOption: (value: string) => void;
  selectTriggerPlaceholder: string;
};

export type ChartProps = {
  title: string;
  wrapperTitle?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  isSelectFilter?: boolean;
  selectProps?: SelectProps;
};

export type StepFormProps = {
  errors: FieldErrors<UserAssignmentSchemaType>;
};
