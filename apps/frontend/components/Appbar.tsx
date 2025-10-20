import { Button } from "./ui/button";
import {
    ClerkProvider,
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
  } from '@clerk/nextjs'

export function Appbar() {
    return <div className="bg-black w-full h-14 flex justify-between items-center px-8 border-b border-zinc-300/10 rounde">
        <p className="font-[700] text-[20px] cursor-pointer text-white">Boltify</p>
        <div className="flex items-center">
        <SignedOut>
              <SignInButton />
              <SignUpButton>
                <button className="bg-white text-black rounded-full font-medium text-sm sm:text-base h-8 sm:h-8 px-4 sm:px-5 cursor-pointer">
                  Sign Up
                </button> 
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
        </div>
        {/* <Button className="w-[90px]">login</Button> */}
    </div>
}