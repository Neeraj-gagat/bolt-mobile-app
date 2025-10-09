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
    return <div className="w-full h-14 bg-transparent flex justify-between items-center px-8 border border-gray-200 rounded-md">
        <p className="font-[700] text-[20px] cursor-pointer">Boltify</p>
        <div>
        <SignedOut>
              <SignInButton />
              <SignUpButton>
                <button className="bg-black text-white rounded-full font-medium text-sm sm:text-base h-8 sm:h-8 px-4 sm:px-5 cursor-pointer">
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