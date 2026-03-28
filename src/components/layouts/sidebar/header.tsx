import Image from "next/image";

interface SidebarLogoHeaderProps {
  isExpanded?: boolean;
}

export default function SidebarLogoHeader({ isExpanded }: SidebarLogoHeaderProps) {
  return (
    <div className="flex items-center py-2">
      <Image
        src="/img/hoskit-logo-v2.svg"
        alt="Hoskit Logo"
        width={43}
        height={43}
        style={{marginTop: '6px'}}
      />
      {isExpanded && <h2 className="text-lg font-semibold">Hoskit</h2>}
    </div>
  );
}
