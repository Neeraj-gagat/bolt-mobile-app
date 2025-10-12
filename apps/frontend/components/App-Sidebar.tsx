"use client"
import { MessageSquare, SearchIcon} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Textarea } from "./ui/textarea"
import { useEffect, useState } from "react"
import axios from "axios"
import { BACKEND_URL } from "@/config"
import { useAuth } from "@clerk/nextjs"
import { useRouter } from "next/navigation"

type AppSidebarProps = {
  description:string,
  id:string,
  url:string,
  icon: React.ElementType
}

export function AppSidebar() {
  const router = useRouter()
  const {getToken} =  useAuth()
  const [projects, setProjects] = useState<AppSidebarProps[]>([])

  useEffect(() => {
  const fetchProjects = async() => {
    try {
      const token = await getToken();
    const response = await axios.get(`${BACKEND_URL}/projects`, { headers:{ "Authorization": `Bearer ${token}`}})

    const formatted = response.data.map((p: AppSidebarProps) => ({
      description: p. description || "Untitled",
      id: p.id,
      url: "#", 
      icon: MessageSquare,
    }));

    setProjects(formatted);
    } catch (error) {
  console.log("error while fetching ptojects", error)    
    }
  };

  fetchProjects()
  },[])


  return (
    <Sidebar className="bg-black text-white">
      <SidebarContent className="bg-black/95 text-white">
        <SidebarGroup>
          <div onClick={() => {
            router.push("/")
          }} className="flex justify-center items-center gap-2 mt-4 mb-2 bg-transparent hover:cursor-pointer">
          <MessageSquare/>
          <SidebarGroupLabel className="text-[17px] text-center text-white">Start new project</SidebarGroupLabel>
          </div>
          <div className="pb-4">
          <p className="p-4 text-[15px] text-start text-white font-[500]">Your projects</p>
          <div className="flex flex-row items-center gap-2">
            <Textarea  placeholder="Search..." className="placeholder:text-[15px] w-[200px] resize-none border border-zinc-400/10 rounded-md h-[32px] p-1 px-2" ></Textarea>
            <SearchIcon className="hover:cursor-pointer"/>
          </div>
          </div>
          
          <SidebarGroupContent className="hover:text-black">
            <SidebarMenu className="text-white hover:text-black ">
              {projects.map((p) => (
                <SidebarMenuItem className="p-1 border-b border-zinc-400/10 hover:text-black" key={p.id}>
                  <SidebarMenuButton className="text-white hover:text-black " asChild>
                    <a href={p.url}>
                      <p.icon />
                      <span className="text-white hover:text-black w-full">{p.description}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}