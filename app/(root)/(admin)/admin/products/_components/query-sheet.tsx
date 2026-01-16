import { ReactNode } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { GripVertical } from "lucide-react";

const ProductQuerySheet = ({ children }: { children: ReactNode }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="md:hidden" variant="outline">
          <GripVertical />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Product Query</SheetTitle>
        </SheetHeader>
        <div className="p-4 flex flex-col justify-start items-stretch gap-4">
          {children}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ProductQuerySheet;
