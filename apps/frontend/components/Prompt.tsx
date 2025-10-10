"use client"
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import {Send} from "lucide-react" 
import axios from "axios";
import { useState } from "react";
import { useAuth } from "@clerk/nextjs";

export function Prompt() {
    const [prompt, setPrompt] = useState("")
    const {getToken} =  useAuth()

    return <div className="flex justify-center flex-col gap-1">
        <Textarea placeholder="Create your first mobile app" value={prompt} className="w-[680px]" onChange={(e) => setPrompt(e.target.value)}/>
        <div className="flex justify-end">
        <Button  className="w-[50px]" onClick={async() => {
            const token = getToken()
            const response = await axios.post("/project", { prompt: prompt },{ headers:{ "Authorization": `Bearer ${token}`}})
            console.log(response.data)
        }}>
            <Send className=""/>
        </Button>
        </div>
       
    </div>
}