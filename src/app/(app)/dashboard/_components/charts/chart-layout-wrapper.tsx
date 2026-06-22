import { EllipsisVertical, Info } from "lucide-react";

interface ChartLayoutWrapperProps {
  children?: React.ReactNode;
  title?: string;
}

export default function ChartLayoutWrapper({ children, title }: ChartLayoutWrapperProps) {
  return (
    <div className="flex flex-col border border-[#F0ECEA] bg-[#FAF9F8] rounded-xl p-[6px] text-neutral-400">
      <div className="flex justify-between items-center">
        <span className="flex items-center space-x-1 py-1">
          <Info className="size-3"/>
          <p className="text-[10px] relative bottom-[1px]">{title || "Activity Overview"}</p>
        </span>
        <EllipsisVertical className="size-3"/>
      </div>
      {children}
    </div>
  )
}