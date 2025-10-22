
"use client"
import { BACKEND_URL } from "@/config"
import { useAuth } from "@clerk/nextjs"
import axios from "axios"
import { useEffect, useState } from "react"

interface Actions {
    id: string,
    content: string,
    cretedAt: Date, 
}

export function useActions(projectId:string) {
    const [actions, setActions] = useState<Actions[]>([])
    const {getToken} =  useAuth()

    useEffect(() => {
        async function getactions() {
            const token = await getToken()
            axios.get(`${BACKEND_URL}/actions/${projectId}`, {
                headers: {
                  "Authorization": `Bearer ${token}`       
                }
            }).then((res) => {
                setActions(res.data.actions);
            })
        }

        getactions();
        const interval = setInterval(getactions, 1000);
        return () => clearInterval(interval)

    },[])

    return {
        actions,
    }
}