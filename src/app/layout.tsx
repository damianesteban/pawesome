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
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { trpc, trpcClient } from '@/lib/trpc'

const inter = Inter({ subsets: ['latin'] })

// TRPC Client
const queryClient = new QueryClient()


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
        <QueryClientProvider client={queryClient}>
          <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <body className={inter.className}>
              <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-grow">
                  {children}
                </main>
              </div>
            </body>
          </trpc.Provider>
        </QueryClientProvider>
      </ClerkProvider>
  </html>
  )
}

