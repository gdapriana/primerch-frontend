import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { HiMiniChartBar } from "react-icons/hi2";

export default function Sidebar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon-lg" variant="ghost" className="md:hidden">
          <HiMiniChartBar className="rotate-270 w-40 h-40" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Are you absolutely sure?</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
