import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import Link from "next/link";

export default function NoItem({
  Icon,
  title,
  description,
  button,
  style,
}: {
  Icon?: LucideIcon;
  title: string;
  description?: string;
  button?: {
    text: string;
    url?: string;
    variant?:
      | "link"
      | "default"
      | "destructive"
      | "outline"
      | "secondary"
      | "ghost"
      | null
      | undefined;
  };
  style?: {
    container?: string;
    icon?: string;
    title?: string;
    description?: string;
  };
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-1 justify-center items-center",
        style?.container,
      )}
    >
      {Icon && <Icon className={cn("w-6 mb-1 h-6", style?.icon)} />}
      <h3 className={cn("text-md text-center", style?.title)}>{title}</h3>
      {description && (
        <p className="text-xs text-center leading-5 text-muted-foreground">
          {description}
        </p>
      )}
      {button && (
        <Button variant={button.variant || "default"} className="mt-3" asChild>
          <Link href={button.url || "#"}>{button.text}</Link>
        </Button>
      )}
    </div>
  );
}
