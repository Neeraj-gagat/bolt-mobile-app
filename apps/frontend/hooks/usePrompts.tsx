"use client"
import { BACKEND_URL } from "@/config"
import { useAuth } from "@clerk/nextjs"
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
    const {getToken} =  useAuth()

    useEffect(() => {
        async function getprompts() {
            const token = await getToken()
            axios.get(`${BACKEND_URL}/prompts/${projectId}`,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            ).then((res) => {
                setPrompts(res.data.prompts);
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