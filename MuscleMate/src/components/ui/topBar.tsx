import { Menubar } from "./menubar";
import { Input } from "./input";
import muscleLogo from "@/assets/MuscleLogo.png";

const TopBar = () => {
    const quotes : Array<string> = ["You are what you eat", "Don't wish for it, work for it", "Sweat is fat crying"]
    return (
        <>
        {/* top bar components */}
        <div className="flex items-center justify-between p-8 lg:px-8">
            <img src={muscleLogo} width={200} height={200} />
            <h1 className="text-center text-sm"> {quotes[Math.floor(Math.random()*quotes.length)]} </h1>
            <div className="mt-5 flex lg:ml-4 gap-20">
            <Input placeholder="Search" className="w-[200px] " />
            <Menubar />
            </div>
        </div>
        <div>
            
        </div>
        </>
    )
}

export default TopBar;