import React from 'react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { GiHamburgerMenu } from "react-icons/gi";
import { Label } from "@/components/ui/label"
import { FaGear } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import "../../css/menuBar.css";

interface MyLabelProps {
    labelName: string;
    // url: string;
}

const MyLabel: React.FC<MyLabelProps> = ({ labelName }) => {
    return (
        <Label htmlFor="name" className="text-right my-label">
            {labelName}
        </Label>
    )
}

export const MenuBar: React.FC = () => {
    return (
        <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className ="text-sm font-semibold leading-6 text-gray-900"><GiHamburgerMenu /></Button>
            </SheetTrigger>

            <SheetContent>
              <SheetHeader>
                <SheetTitle>Home</SheetTitle>
              </SheetHeader>

                <div className="grid gap-4 py-4">
                    <div id="sideBar" className="grid grid-cols-4 items-center gap-4">
                        <MyLabel labelName='My Workouts'/>
                        <MyLabel labelName='My Exercises' />
                        <MyLabel labelName='Exercises' />
                        <MyLabel labelName='Favorites' />
                        <MyLabel labelName='My Progress' />
                        <FaGear />
                        <CgProfile />
                    </div>
                </div>


              <SheetFooter>
                made by Farquaad
              </SheetFooter>
              {/* <SheetClose>
                ... back to page
              </SheetClose> */}
            </SheetContent>
        </Sheet>
    );
}