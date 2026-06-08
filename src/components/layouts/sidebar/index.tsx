"use client";

import CustomInput from "@/components/input/custom-input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useSession } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { TMenuItem, TMenuSection } from "@/models/sidebar";
import { ArrowLeft, ChevronRight, Search } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import SidebarLogoHeader from "./header";
import NavGroupContent from "./nav-group/content";
import NavGroupHeader from "./nav-group/header";
import ProfileBox from "./profile-box";

function RecursiveMenuItem({
  item,
  level,
  isActive,
  onClick,
  isExpanded,
}: {
  item: TMenuItem;
  level: number;
  isActive: boolean;
  onClick: () => void;
  isExpanded: boolean;
}) {
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
              <ul key={index}>
                <RecursiveMenuItem
                  isActive={false}
                  isExpanded={isExpanded}
                  item={childItem}
                  key={index}
                  level={level + 1}
                  onClick={onClick}
                />
              </ul>
            ))}
          </CollapsibleContent>
        </Collapsible>
      )}
    </SidebarMenuItem>
  );
}

export function MainSidebar({ menu }: { menu: TMenuSection[] }) {
  const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const { state } = useSidebar();

  const renderMenuItems = (items?: TMenuItem[], level = 0) => {
    return (
      items &&
      items.map((item, index) => (
        <RecursiveMenuItem
          isActive={pathname === item.href}
          isExpanded={state === "expanded"}
          item={item}
          key={index}
          level={level}
          onClick={() => {}}
        />
      ))
    );
  };

  const referralsItem = menu[0].items.find(item => item.href === "/referrals");

  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader className="border-b p-4">
        <SidebarLogoHeader isExpanded={state === "expanded"} />
        {/* Search bar (only when expanded) */}
        {state === "expanded" && (
          <div className="flex gap-2">
            <CustomInput
              icon={<Search className="size-4 text-[#A1A1AA]" />}
              placeholder="Search"
              type="search"
              inputWrapperClassName="!bg-[#EAEAEA]"
              inputClassName="!bg-[#EAEAEA] !text-[#A1A1AA] focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
        )}
      </SidebarHeader>
      <SidebarContent>
        {/* Back button (only on referrals page) */}
        {pathname.includes("/referrals") && (
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    className="mt-5 w-full justify-start"
                    onClick={() => {
                      router.replace("/dashboard");
                    }}
                  >
                    <ArrowLeft className="mr-1 size-4" />
                    Back to Dashboard
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* Menu items (conditionally rendered based on pathname) */}
        {!pathname.includes("/referrals") ? (
          menu.map((section, sectionIndex) => {
            const isOtherMenu = section.label === "OTHER MENU";

            if (isOtherMenu) {
              return (
                <Collapsible className="group/collapsible" defaultOpen key={sectionIndex}>
                  <SidebarGroup>
                    <NavGroupHeader label={section.label} isCollapsible />
                    <NavGroupContent items={section.items} pathname={pathname} isCollapsible />
                  </SidebarGroup>
                </Collapsible>
              );
            }

            return (
              <SidebarGroup key={sectionIndex}>
                <NavGroupHeader label={pathname !== "/referrals" ? section.label : ""} />
                <NavGroupContent items={section.items} pathname={pathname} />
              </SidebarGroup>
            );
          })
        ) : (
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>{renderMenuItems(referralsItem?.child)}</SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
      <SidebarFooter>
        <ProfileBox session={session} />
      </SidebarFooter>
    </Sidebar>
  );
}
