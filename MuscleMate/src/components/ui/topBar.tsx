import { Menubar } from "./menubar";
import { Input } from "./input";
import muscleLogo from "@/assets/MuscleLogo.png";
import { useEffect, useState } from "react";
import quotes from "./quotes";

const TopBar = () => {
    const [quote, setQuote] = useState<string>("If life gives you lemons, make lemonade. If life gives you combustible lemons, well, let's just say you're in for a wild ride.");
    
    useEffect(() => {
        setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    }, []);

    const goHome = () => {
        window.location.href = "/";
    }

    return (
        <>
        {/* top bar components */}
        <div className="flex items-center justify-between p-8 lg:px-8">
            <button onClick={goHome}>
                <img src={muscleLogo} width={200} height={200} />
            </button>
            <h1 className="text-center text-sm"> {quote} </h1>
            <div className="mt-5 flex lg:ml-4 gap-20">
            <Input placeholder="Search" className="w-[200px] " />
            <Menubar />
            </div>
        </div>
        </>
    )
}

export default TopBar;