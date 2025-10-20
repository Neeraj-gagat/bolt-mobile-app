"use client"
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import {Send} from "lucide-react" 
import axios from "axios";
import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { BACKEND_URL } from "@/config";
import { useRouter } from "next/navigation";

export function Prompt() {
    const router = useRouter();
    const [prompt, setPrompt] = useState("")
    const {getToken} =  useAuth()

    return <div className="flex justify-center flex-col gap-1">
        <Textarea placeholder="Create your first mobile app" value={prompt} className="w-[680px] border-zinc-400/20 resize-none" onChange={(e) => setPrompt(e.target.value)}/>
        <div className="flex justify-end">
        <Button  className="w-[40px] h-[35px] bg-white hover:bg-white" onClick={async() => {
            const token = await getToken()
            const response = await axios.post(`${BACKEND_URL}/project`, { prompt: prompt },{ headers:{ "Authorization": `Bearer ${token}`}})
            router.push(`/project/${response.data.projectId}`)
        }}>
            <Send color="black" className="bg-white"/>
        </Button>
        </div>
       
    </div>
}