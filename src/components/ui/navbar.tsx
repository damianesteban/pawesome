import { Bell, PawPrint } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SignedIn, UserProfile, UserButton } from "@clerk/nextjs"

export function Navbar() {
  return (
    <header className="bg-white shadow-md">
      <div className="flex items-center justify-between p-4">
        <Link href="/" className="flex items-center space-x-2">
          <PawPrint className="h-6 w-6 text-blue-500" />
          <span className="text-xl font-bold text-gray-800">Pawesome</span>
        </Link>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <SignedIn>
                    <UserButton />
                    </SignedIn>
              {/* <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Image
                  src="/profile.jpg"
                  alt="User avatar"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              </Button> */}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}