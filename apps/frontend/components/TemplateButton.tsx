// import { div } from "./ui/button";

export function TemplateButton() {
    return <div className="flex gap-2">
        <span className="cursor-pointer border border-zinc-300 rounded-full bg-gray-50 hover:bg-gray-100 text-xs px-3 py-1">Build a chess app</span>
        <span className="cursor-pointer border border-zinc-300 rounded-full bg-gray-50 hover:bg-gray-100 text-xs px-3 py-1">Create a todo app</span>
        <span className="cursor-pointer border border-zinc-300 rounded-full bg-gray-50 hover:bg-gray-100 text-xs px-3 py-1">Create a docs app</span>
        <span className="cursor-pointer border border-zinc-300 rounded-full bg-gray-50 hover:bg-gray-100 text-xs px-3 py-1">Create a Weather app</span>
    </div>
}