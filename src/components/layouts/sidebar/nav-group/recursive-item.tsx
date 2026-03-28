import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { TMenuItem } from "@/models/sidebar";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface IRecursiveMenuItemProps {
  item: TMenuItem;
  level: number;
  isActive: boolean;
  onClick: () => void;
  isExpanded: boolean;
}

export default function RecursiveMenuItem({ item, level, isActive, onClick, isExpanded }: IRecursiveMenuItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isReferrals = item.href === "/referrals";

  const getInitials = (title: string) => {
    const words = title.split(" ");
    if (words.length === 1) {
      return words[0].charAt(0).toUpperCase();
    } else {
      return words.map(word => word.charAt(0).toUpperCase()).join("");
    }
  };

  const handleItemClick = () => {
    if (item.child && !isReferrals) {
      setIsOpen(!isOpen);
    }
    onClick();
  };

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild={!item.child || isReferrals}
        className={cn(
          "mb-2 w-full justify-between py-2 pl-9",
          isActive && "border border-sidebar-border bg-white text-accent-foreground",
          level > 0 && "pl-14"
        )}
        onClick={handleItemClick}
      >
        {item.child && !isReferrals ? (
          <div className="flex w-full items-center justify-between py-2">
            {isExpanded ? (
              <>
                <span className="flex items-center gap-2">
                  {item.icon}
                  {item.title}
                </span>
                <ChevronRight
                  className={cn("h-4 w-4 transition-transform", isOpen && "rotate-90")}
                />
              </>
            ) : (
              <span className="flex items-center gap-2">
                <Avatar className="size-8">
                  <AvatarFallback>{getInitials(item.title)}</AvatarFallback>
                </Avatar>
              </span>
            )}
          </div>
        ) : (
          <Link
            className="mb-2 flex w-full items-center justify-between py-2"
            href={item.href || "#"}
          >
            <span className="flex items-center gap-2">
              {item.icon}
              {item.title}
            </span>
            {item.badge != null && <Badge>{item.badge}</Badge>}
          </Link>
        )}
      </SidebarMenuButton>
      {item.child != null && !isReferrals && (
        <Collapsible open={isOpen}>
          <CollapsibleContent>
            {item.child.map((childItem, index) => (
              <RecursiveMenuItem
                isActive={false}
                isExpanded={isExpanded}
                item={childItem}
                key={index}
                level={level + 1}
                onClick={onClick}
              />
            ))}
          </CollapsibleContent>
        </Collapsible>
      )}
    </SidebarMenuItem>
  );
}
