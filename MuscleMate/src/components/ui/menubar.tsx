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
import "@/css/menuBar.css";
import { useNavigate } from 'react-router';
import { ReactNode } from 'react';

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

type RedirectProps = {
  to: string;
  children: ReactNode;
};

const Redirect = ({ to, children }: RedirectProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(to);
  };

  return (
    <Label htmlFor="name" className="text-right" onClick={handleClick}>
      {children}
    </Label>
  );
};

const goToUser = () => {
  window.location.href = "/user";
}

export const Menubar: React.FC = () => {
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
          <Redirect to="/workout">
              <MyLabel labelName='My Workouts'/>
          </Redirect>

          <Redirect to="/exercise">
              <MyLabel labelName='Exercises'/>
          </Redirect>

          <MyLabel labelName='Favorites' />
          <MyLabel labelName='My Progress' />
        </div>

        <SheetFooter>
          <div className='bottom'>
            <a><FaGear size={40}/></a>
            <Redirect to="/user">
            <button ><CgProfile size={40} /></button>
            </Redirect>
          </div>
        </SheetFooter>

      </SheetContent>
    </Sheet>
  );
}