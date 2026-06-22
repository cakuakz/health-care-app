"use client";

import { PageBreadcrumbs } from "@/components/breadcrumbs";
import MainButton from "@/components/button";
import CustomInput from "@/components/input/custom-input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, Check, Clock, Search, Settings } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function PageHeader() {
  const router = useRouter();
  return (
    <header className="sticky top-0 z-30 w-full border-b bg-background/95 px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center">
        <div className="flex items-center gap-3">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
          <PageBreadcrumbs />
        </div>
        <div className="flex flex-1 items-center justify-end gap-4">
          <div className="w-64">
            <CustomInput
              icon={<Search className="size-4 text-gray-600" />}
              placeholder="Search"
              type="search"
              inputWrapperClassName="drop-shadow-button-header border rounded-lg border-border"
            />
          </div>
          <Button size="icon" variant="ghost" className="drop-shadow-button-header border rounded-lg border-border">
            <Settings className="size-4" />
            <span className="sr-only">Settings</span>
          </Button>
          <NotificationPopover />
        </div>
      </div>
    </header>
  );
}

interface Notification {
  id: string;
  title: string;
  timestamp: string;
  category: string;
  action: {
    label: string;
    href: string;
  };
  status: "approved" | "urgent" | "stat";
}

const notifications: Notification[] = [
  {
    id: "13579",
    title: "Referral #13579 Approved by Insurance",
    timestamp: "14 mins ago",
    category: "Insurance",
    action: {
      label: "Schedule Now",
      href: "#",
    },
    status: "approved",
  },
  {
    id: "11234",
    title: "Referral #11234 is due for follow-up tomorrow. Please confirm patient status",
    timestamp: "20 mins ago",
    category: "Follow-up",
    action: {
      label: "Schedule Now",
      href: "#",
    },
    status: "urgent",
  },
  {
    id: "67890-1",
    title: "PCP added additional details to Referral #67890",
    timestamp: "30 mins ago",
    category: "Clinical Data",
    action: {
      label: "View Referral",
      href: "#",
    },
    status: "urgent",
  },
  {
    id: "67890-2",
    title: "Patient feedback has been added to Referral #67890. Review the notes for insights",
    timestamp: "36 mins ago",
    category: "Clinical Data",
    action: {
      label: "View Referral",
      href: "#",
    },
    status: "stat",
  },
  {
    id: "12345",
    title: "Insurance verification for Referral #12345 is pending.",
    timestamp: "45 mins ago",
    category: "Insurance",
    action: {
      label: "View Referral",
      href: "#",
    },
    status: "urgent",
  },
];

function NotificationPopover() {
  const [notificationTabs, setNotificationTabs] = useState("all");

  const filterNotification = notifications.filter(
    notification => notification.status === notificationTabs || notificationTabs === "all"
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="icon" variant="ghost" className="drop-shadow-button-header border rounded-lg border-border">
          <Bell className="size-4" />
          <span className="sr-only">Notifications</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-[380px] p-0">
        <Card className="border-0">
          <div className="flex items-center justify-between border-b p-4">
            <h2 className="text-sm font-semibold">Notifications</h2>
            <Button className="h-auto p-0 text-sm" variant="link">
              Mark all as read
            </Button>
          </div>
          <Tabs className="w-full" onValueChange={setNotificationTabs} value={notificationTabs}>
            <div className="border-b px-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="stat">STAT</TabsTrigger>
                <TabsTrigger value="urgent">Urgent</TabsTrigger>
                <TabsTrigger value="insurance">Insurance</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent className="mt-0" value={notificationTabs}>
              <div className="space-y-2 p-2">
                {filterNotification.map(notification => (
                  <div
                    className="flex gap-3 rounded-lg p-2 hover:bg-muted/50"
                    key={notification.id}
                  >
                    <div className="mt-1">
                      {notification.status === "approved" ? (
                        <div className="rounded-full bg-green-500/20 p-1">
                          <Check className="size-4 text-green-500" />
                        </div>
                      ) : (
                        <div className="rounded-full bg-orange-500/20 p-1">
                          <Clock className="size-4 text-orange-500" />
                        </div>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col gap-1">
                      <p className="text-sm">{notification.title}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{notification.timestamp}</span>
                          <span>•</span>
                          <span>{notification.category}</span>
                        </div>
                        <Button
                          asChild
                          className="h-7 bg-blue-600 text-xs hover:bg-blue-700"
                          size="sm"
                        >
                          <a href={notification.action.href}>{notification.action.label}</a>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </PopoverContent>
    </Popover>
  );
}
