import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Button } from "@/components/ui/button"
import '/src/app/globals.css'
import Link from 'next/link'
// import { useRouter } from 'next/navigation'

const inter = Inter({ subsets: ['latin'] })
// const router = useRouter();

export const metadata: Metadata = {
  title: 'JobDoor',
  description: 'A job board for job seekers',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h1>neew</h1>
          <div className="flex space-x-4">
            <Button >
              <Link href="/auth/login">Login</Link>
            </Button>
            <Button variant="outline">Signup</Button>
          </div>
        </nav>
        {children}
      </body>
    </html>
  )
}
