'use client';

import { MainSidebar } from "@/components/layouts/sidebar";
import { SidebarMenuList } from "@/components/layouts/sidebar/list";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <MainSidebar menu={SidebarMenuList} />
      <SidebarInset>
        <div
          className="no-scrollbar relative h-full grow overflow-auto rounded-xl"
          style={{
            backgroundColor: "white",
            backgroundImage: "radial-gradient(circle, #E5E7EB 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        >
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
