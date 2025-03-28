"use client"

import { usePathname } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { quickLinks } from "@/data/constants"

export default function Footer() {
  const path = usePathname()

  if (path.includes("mp")) return null

  return (
    <footer className="bg-gray-900 text-white py-8 mt-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-20">
          <div className="space-y-4 lg:mx-auto">
            <Link href="/" className="flex items-center">
              <Image src="/Logo/logo.svg" width={50} height={50} alt="MyPath AI" className="mr-2" />
              <span className="text-xl font-bold">MyPath AI</span>
            </Link>
            <p className="text-sm text-gray-300 max-w-md">
            MyPath is the world's first AI-powered unified, personalized learning platform made for students to learn, connect, 
            and grow.
            </p>
          </div>

          <div className="space-y-4 lg:mx-auto">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <nav>
              <ul className="space-y-2">
               {quickLinks.map((link,index) => (

                 <li key={index}>
                  <Link href={link.href} className="text-sm text-gray-300 hover:text-white">
                    {link.title}
                  </Link>
                </li>
               
                ))}
              </ul>
            </nav>
          </div>
          <div className="space-y-4 lg:mx-auto">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <p className="text-sm text-gray-300">Issues? Email us at:</p>
            <a href="mailto:info2mypath@gmail.com" className="text-sm text-blue-400 hover:underline">
              info2mypath@gmail.com
            </a>
          </div>

        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} MyPath AI. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

