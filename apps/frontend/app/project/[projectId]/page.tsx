import { Appbar } from "@/components/Appbar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { WORKER_URL } from "@/config";
import { SearchIcon, Send } from "lucide-react";


export default function ProjectArenaPage({params}: {params: {projectId: string}}) {
    return <div className="h-screen w-full">
        {/* <Appbar/> */}
        <div className="flex h-screen">
            <div className="w-1/4 h-screen flex flex-col justify-between">
                <div className="text-white h-6/7 ">
                    <p className="flex justify-center text-center text-[20px] font-[700] py-2.5">Chat history</p>
                    <div className="overflow-y-auto h-[90%] flex flex-col gap-2 p-2 bg-black/90 rounded-md">
                            
                    </div>
                </div>
                <div className="h-1/7">
                    <div className="flex items-center gap-2 mt-2">
                    <Textarea  placeholder="Chat here..." className="placeholder:text-[15px] w-[280px] resize-none border border-zinc-400/10 rounded-md h-[75px] p-1 px-2 text-white" ></Textarea>
                    <Button className="hover:cursor-pointer h-[60px] w-[60px] bg-white hover:bg-white">
                        <Send size={24} color="black" className="bg-white"/>
                    </Button>
                    </div>
                </div>
            </div>
            <div className="w-3/4 p-2">
                <iframe src={`${WORKER_URL}/`} className="w-full h-full"/>
            </div>
        </div>    
    </div>
}