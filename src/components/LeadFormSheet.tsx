import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LeadForm } from "@/components/LeadForm";
import { ReactNode } from "react";

interface LeadFormSheetProps {
  trigger: ReactNode;
  title?: string;
}

export function LeadFormSheet({ trigger, title = "Talk to our Career Expert" }: LeadFormSheetProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        {trigger}
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md p-0 overflow-y-auto bg-background/95 backdrop-blur-xl border-l border-border">
        <SheetHeader className="p-6 pb-2">
          <SheetTitle className="text-2xl font-display">{title}</SheetTitle>
        </SheetHeader>
        <div className="p-6">
          <LeadForm className="border-0 shadow-none bg-transparent" />
        </div>
      </SheetContent>
    </Sheet>
  );
}
