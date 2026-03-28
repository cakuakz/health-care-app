import { Badge } from "@/components/ui/badge";
import { CollapsibleContent } from "@/components/ui/collapsible";
import { SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { TMenuItem } from "@/models/sidebar";
import Link from "next/dist/client/link";

interface NavGroupContentProps {
  items: TMenuItem[];
  pathname: string;
  isCollapsible?: boolean;
}

function NavGroupContentItem({ items, pathname }: NavGroupContentProps) {
  return (
    <SidebarGroupContent className="pl-2">
      <SidebarMenu>
        {items.map((item, itemIndex) => (
          <SidebarMenuItem key={itemIndex}>
            <SidebarMenuButton
              asChild
              className={cn(
                "text-[#353849]",
                pathname === item.href
                  ? "pointer-events-none bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))]"
                  : "hover:bg-accent"
              )}
              disabled={pathname === item.href}
              tooltip={item.tooltip || item.title}
            >
              <Link
                className={pathname === item.href ? "cursor-default" : "cursor-pointer"}
                href={item.href || "#"}
              >
                {item.icon}
                <span>{item.title}</span>
                {item.badge ? (
                  <Badge
                    className="ml-auto size-5 justify-center rounded-md px-0"
                    variant="destructive"
                  >
                    {item.badge}
                  </Badge>
                ) : null}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroupContent>
  );
}

export default function NavGroupContent({ items, pathname, isCollapsible = false }: NavGroupContentProps) {
  return isCollapsible ? (
    <CollapsibleContent>
      <NavGroupContentItem items={items} pathname={pathname} />
    </CollapsibleContent>
  ) : (
    <NavGroupContentItem items={items} pathname={pathname} />
  );
};