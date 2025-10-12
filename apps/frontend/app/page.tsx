import { Appbar } from "@/components/Appbar";
import { Prompt } from "@/components/Prompt";
import { TemplateButton } from "@/components/TemplateButton";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full">
      <Appbar />
      <SidebarTrigger className="bg-black text-white hover:bg-black hover:text-white hover:cursor-pointer"/>
      <div className="max-w-2xl mx-auto pt-32 text-white">
        <p className="text-2xl font-bold text-center">What do you want to build?</p>
        <p className="text-sm text-white/80 text-center p-2">
          Prompt, click generate and watch your app come to life
        </p>
        <div className="flex justify-center pt-2">
        <Prompt />
        </div>
      </div>
      <div className="max-w-2xl mx-auto pt-4">
        <TemplateButton/>
      </div>
    </div>
  );
}
