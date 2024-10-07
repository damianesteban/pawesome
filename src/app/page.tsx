import { SignedIn, SignedOut, SignInButton, UserButton, SignOutButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="grid grid-cols-1 gap-2">
      <SignedIn>
        <Link
          href="/dashboard"
          className="px-4 py-2 rounded-full bg-[#131316] text-white text-sm font-semibold"
        >
          Dashboard
        </Link>
        <SignOutButton>
          <button className="px-4 py-2 rounded-full bg-[#131316] text-white text-sm font-semibold">
              Sign Out
            </button>
          </SignOutButton>
      </SignedIn>

      <SignedOut>
        <SignInButton>
          <button className="px-4 py-2 rounded-full bg-[#131316] text-white text-sm font-semibold">
            Sign In
          </button>
        </SignInButton>
      </SignedOut>
    </div>
    </div>
  );
}
