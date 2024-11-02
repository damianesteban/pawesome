import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Pawesome</h1>
          <nav>
            <Link href="/login" passHref>
              <Button variant="outline">Log In</Button>
            </Link>
            <Link href="/dashboard" passHref>
              <Button variant="default">Dashboard</Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-grow bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Welcome to Pawesome</h2>
          <p className="text-xl text-gray-600">This is the home page for Pawesome</p>
        </div>
      </main>

      <footer className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center text-gray-500">
          © 2023 My App. All rights reserved.
        </div>
      </footer>
    </div>
  )
}