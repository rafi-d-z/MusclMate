import { Menubar } from "./menubar";
import { Input } from "./input";
import muscleLogo from "@/assets/MuscleLogo.png";

const TopBar = () => {
    return (
        <>
        {/* top bar components */}
        <div className="flex items-center justify-between p-8 lg:px-8">
            <img src={muscleLogo} width={200} height={200} />
            <div className="mt-5 flex lg:ml-4 gap-20">
            <Input placeholder="Search" className="w-[200px] " />
            <Menubar />
            </div>
        </div>
        </>
    )
}

export default TopBar;