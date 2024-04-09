import React from 'react';
import {
  Sheet,
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
      <Button>
        <Label htmlFor="name" className="text-right">
            {labelName}
        </Label>
      </Button>
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
                <SheetTitle>Get Pumped</SheetTitle>
              </SheetHeader>

                <div className="flex flex-col space-y-4">
                  <MyLabel labelName='My Workouts'/>
                  <MyLabel labelName='My Exercises' />
                  <MyLabel labelName='Exercises' />
                  <MyLabel labelName='Favorites' />
                  <MyLabel labelName='My Progress' />
                </div>

                <SheetFooter>
                  <div className='bottom'>
                    <a><FaGear size={40}/></a>
                    <a><CgProfile size={40} /></a>
                  </div>
                </SheetFooter>

            </SheetContent>
        </Sheet>
    );
}