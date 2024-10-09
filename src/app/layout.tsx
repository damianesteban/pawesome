import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import { Navbar } from '@/components/ui/navbar'
import TrpcProvider from '@/modules/providers/TrpcProvider'

const inter = Inter({ subsets: ['latin'] })

// TRPC Client


export const metadata: Metadata = {
  title: 'Animal Rescue Management',
  description: 'Manage your animal rescue operations efficiently',
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <ClerkProvider>
        <TrpcProvider>
            <body className={inter.className}>
              <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-grow">
                  {children}
                </main>
              </div>
            </body>
        </TrpcProvider>
      </ClerkProvider>
  </html>
  )
}

