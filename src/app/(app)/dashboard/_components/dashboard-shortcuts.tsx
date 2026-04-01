import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CirclePlus, FlagTriangleRight } from "lucide-react";
import React, { useState } from "react";

type ShortcutItemProps = {
  label: string;
  onAddShortcut?: (title: string) => void;
};

const ShorcutItems = [
  { label: "Overdue Orders" },
  { label: "Aging Backlog (Backlog Boost)" },
  { label: "Unassigned Orders" },
  { label: "Orders to Re-submit or Cancel" },
];

export function ShortcutItem({ label, onAddShortcut }: ShortcutItemProps) {
  const [hideButton, setHideButton] = useState(false);

  return (
    <div
      className={`${hideButton ? "hidden" : "flex"} mb-[6px] items-center justify-between rounded-md border border-[#F5F6F8] px-2 py-[6px]`}
    >
      <p className="text-xs font-normal text-[#606060]">{label}</p>
      <CirclePlus
        className="size-3 cursor-pointer text-[#1757F7]"
        onClick={() => {
          setHideButton(true);
          onAddShortcut?.(label);
        }}
      />
    </div>
  );
}

export default function DashboardShortcuts({
  onAddShortcut,
}: {
  onAddShortcut?: (title: string) => void;
}) {
  return (
    <Card className="!min-h-[225px] grow rounded-xl border border-[#F5F6F8] !p-5">
      <div className="mb-6 flex items-center space-x-2">
        <span className="size-5 rounded-sm bg-[#1757F7]/5 p-1">
          <FlagTriangleRight className="size-3 text-[#1757F7]" />
        </span>
        <p className="text-base font-semibold">Shortcuts</p>
      </div>
      <ScrollArea className="!h-full">
        {ShorcutItems.map((item, index) => (
          <ShortcutItem
            key={index}
            label={item.label}
            onAddShortcut={title => onAddShortcut?.(title)}
          />
        ))}
      </ScrollArea>
    </Card>
  );
}
