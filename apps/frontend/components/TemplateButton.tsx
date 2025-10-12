// import { div } from "./ui/button";

export function TemplateButton() {
    return <div className="flex gap-2">
        <span className="font-[500] cursor-pointer border border-zinc-300/20 rounded-full bg-black hover:bg-white hover:text-black text-xs px-3 py-1 text-white transition-all duration-300">Build a chess app</span>
        <span className="font-[500] cursor-pointer border border-zinc-300/20 rounded-full bg-black hover:bg-white hover:text-black text-xs px-3 py-1 text-white transition-all duration-300">Create a todo app</span>
        <span className="font-[500] cursor-pointer border border-zinc-300/20 rounded-full bg-black hover:bg-white hover:text-black text-xs px-3 py-1 text-white transition-all duration-300">Create a docs app</span>
        <span className="font-[500] cursor-pointer border border-zinc-300/20 rounded-full bg-black hover:bg-white hover:text-black text-xs px-3 py-1 text-white transition-all duration-300">Create a Weather app</span>
    </div>
}