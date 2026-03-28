import { CollapsibleTrigger } from "@/components/ui/collapsible";
import { SidebarGroupLabel } from "@/components/ui/sidebar";
import { ChevronDown } from "lucide-react";

interface NavGroupHeaderProps {
  label: string;
  isCollapsible?: boolean;
}

export default function NavGroupHeader({ label, isCollapsible = false }: NavGroupHeaderProps) {
  return (
    <SidebarGroupLabel asChild>
      {isCollapsible ? (
        <CollapsibleTrigger className="flex items-center">
          {label}
          <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
        </CollapsibleTrigger>
      ) : (
        <span>{label}</span>
      )}
     </SidebarGroupLabel>
  );
}
