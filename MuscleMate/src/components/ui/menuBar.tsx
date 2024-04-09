import React from 'react';
import {
  Sheet,
//   SheetClose,
  SheetContent,
  SheetDescription,
//   SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { GiHamburgerMenu } from "react-icons/gi";

export const MenuBar: React.FC = () => {
    return (
        <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className ="text-sm font-semibold leading-6 text-gray-900"><GiHamburgerMenu /></Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Edit profile</SheetTitle>
                <SheetDescription>
                  Make changes to your profile here. Click save when you're done.
                </SheetDescription>
              </SheetHeader>
              {/* Add SheetClose, SheetFooter or other components if necessary */}
            </SheetContent>
        </Sheet>
    );
}