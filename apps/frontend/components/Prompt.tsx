import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import {Send} from "lucide-react" 

export function Prompt() {
    return <div className="flex justify-center flex-col gap-1">
        <Textarea placeholder="Create your first mobile app" className="w-[680px]"/>
        <div className="flex justify-end">
        <Button className="w-[50px]">
            <Send className=""/>
        </Button>
        </div>
       
    </div>
}