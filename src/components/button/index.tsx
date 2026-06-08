import { cn } from "@/lib/utils";
import React from "react";
import { Button } from "../ui/button";

interface MainButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  buttonType?: "primary" | "secondary" | "tertiary";
  text?: string;
  icon?: React.ReactNode;
  iconPosition?: "start" | "end";
}

export default function MainButton({
  buttonType = "primary",
  text,
  icon,
  iconPosition = "start",
  ...props
}: MainButtonProps) {
  const getIconPositionClass = () => {
    if (iconPosition === "start") {
      return "flex flex-row";
    }
    return "flex flex-row-reverse";
  };

  const buttonClassnames = cn(
    "rounded-lg px-4 py-[6px] text-sm font-medium transition-colors duration-200",
    buttonType === "primary" &&
      "bg-[#4F4F4F] text-white shadow-[0px_3.99px_5.99px_0px_rgba(0,0,0,0.14)] [box-shadow:inset_0px_0px_18.6px_-1px_rgba(255,255,255,0.50)] hover:bg-[#4F4F4F]/90",
    
  );

  return (
    <Button
      {...props}
      className={`${getIconPositionClass()} ${props.className} ${buttonClassnames}`}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {text}
    </Button>
  );
}
