import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Slash } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

export function PageBreadcrumbs() {
  const pathname = usePathname();
  const breadcrumbs = pathname.split("/").filter(Boolean).map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1));

  const breadcrumbsItem = breadcrumbs.map((item) => {
    let url = '';

    if (breadcrumbs.length > 1) {
      url = `/${breadcrumbs.slice(0, breadcrumbs.indexOf(item) + 1).join("/").toLowerCase()}`;
    } else {
      url = `/${item.toLowerCase()}`;
    }

    return {
      name: item,
      href: url,
    };
  });

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbsItem.map((item, index) => (
          <Fragment key={item.name}>
            {index !== breadcrumbs.length - 1 ? (
              <BreadcrumbItem>
                <Link className="font-medium" href={item.href || "#"}>
                  {item.name}
                </Link>
              </BreadcrumbItem>
            ) : null}
            {index < breadcrumbs.length - 1 ? (
              <BreadcrumbSeparator>
                <Slash className="!size-3 -rotate-12" />
              </BreadcrumbSeparator>
            ) : null}
            {index === breadcrumbs.length - 1 ? (
              <BreadcrumbPage className="font-medium text-primary">{item.name}</BreadcrumbPage>
            ) : null}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
