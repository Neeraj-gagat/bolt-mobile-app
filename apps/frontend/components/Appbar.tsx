import { Button } from "./ui/button";

export function Appbar() {
    return <div className="w-full h-14 bg-transparent flex justify-between items-center px-8 border border-gray-200 rounded-md">
        <p className="font-[700] text-[20px]">Boltify</p>
        <Button className="w-[90px]">login</Button>
    </div>
}