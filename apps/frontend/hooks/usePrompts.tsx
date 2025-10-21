"use client"
import { BACKEND_URL } from "@/config"
import axios from "axios"
import { useEffect, useState } from "react"

interface Prompts {
    id: string,
    content: string,
    type: 'USER' | 'SYSTEM',
    cretedAt: Date, 
}

export function usePrompts(projectId:string) {
    const [prompts, setPrompts] = useState<Prompts[]>([])

    useEffect(() => {
        function getprompts() {
            axios.get(`${BACKEND_URL}/prompts/${projectId}`).then((res) => {
                setPrompts(res.data);
            })
        }

        getprompts();
        const interval = setInterval(getprompts, 10000);
        return () => clearInterval(interval)

    },[])

    return {
        prompts,
    }
}